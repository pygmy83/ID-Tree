# Prepare java script files 'tetrapods_tree' and 'tetrapods_meta' for OneZoom;
# The script will use tetrapod tree and species metadata to build java script files
# Javascript files need to be copied into appropriate OneZoom folders

# Packages needed
packages.needed <- c("ape", "geiger","phytools","devtools", "psych", "phylolm", "caper", "MCMCglmm", "nlme", "picante")

out <- lapply(packages.needed, function(y) {
  if(!y %in% installed.packages()[,"Package"])  install.packages(y)
  require(y, character.only = T) 
})



# Function 'addtags' will add numbers for tips and internal nodes into the tree
addtags <- function(a){
  
  a_split <- strsplit(a, "")[[1]]
  b_split <- rep(NA, length(a_split))
  tipindex <- 1
  nodeindex <- 1
  for (i in 1:length(a_split)){
    if (a_split[i] == ':'){
      b_split[i] <- ifelse(grepl("[[:alpha:]]", a_split[i-1]),
                           paste0("[", tipindex,"]",a_split[i]),
                           paste0("[", nodeindex,"]",a_split[i]))
      tipindex <- ifelse(grepl("[[:alpha:]]", a_split[i-1]),
                         tipindex+1,tipindex)
      nodeindex <- ifelse(grepl("[[:alpha:]]", a_split[i-1]),
                          nodeindex,nodeindex+1)
    } else if (a_split[i] == ';') {
      b_split[i] <- paste0("[", nodeindex,"]",a_split[i])
    } else {
      b_split[i] <- a_split[i]
    }
  }
  b <- paste(b_split,collapse="")
  return(b)
}




# Prepare file with tree for OneZoom
tetrapod.tree <- read.tree ('tetrapods_tree_full.tre')
#is.binary.tree(tetrapod.tree)
speMeta <- read.delim('speMeta.txt', sep='\t', header=T)
row.names(speMeta) <- speMeta$latin
spectoprune <- name.check(tetrapod.tree,speMeta)
tree.pr <- drop.tip(tetrapod.tree, spectoprune$tree_not_data)
tree.pr$node.label <- NULL # this is because node labels confuse results of 'addtags' function
spectoprune$data_not_tree

plot(tree.pr,no.margin=TRUE, label.offset = 0.1)
nodelabels()
tiplabels()
edgelabels()
write.tree(tree.pr, file="tetrapods_pruned.tre")

a <- readLines("tetrapods_pruned.tre")
b <- addtags(a)
test.tree <- read.tree(text=b)
plot(test.tree)

# save pruned tree as JS file
b.js <- paste0('var rawData = "',
       b,
       '";')

fileConn<-file("tetrapods_tree.js")
writeLines(b.js, fileConn)
close(fileConn)





# Prepare file with metadata for OneZoom
test.tree <- read.tree("tetrapods_pruned.tre")
speciesorder <- test.tree$tip.label
speMeta <- read.delim('speMeta.txt', sep='\t', header=T)
speMeta.sorted <- speMeta[match(speciesorder, speMeta$latin),]

sink("tetrapods_meta.js")                     # Begin writing output to file
cat("var metadata = {\n\n")

# species metadata
cat("'leaf_meta':\n", append=T)
cat('[["latin","common","IUCN","popstab","sound","picfile","qual","piccredit"],\n', append=T)
ntips <- nrow(speMeta.sorted)
for (i in 1:ntips){
  metaline <- as.vector(t(speMeta.sorted)[,i])
  cat ("[", append=T)
  cat ('"', append=T)
  cat (metaline, sep='","', append=T)
  cat ('"', append=T)
  cat ("]", append=T)
  closing <- ifelse(i == ntips, "\n],\n\n", ",\n\n")
  cat (closing, append=T)
}

# nodes metadata
cat("'node_meta':\n", append=T)
cat('[["common"],\n', append=T)
nnodes <- ntips-1
for (i in 1:nnodes){
  cat('[""]', append=T)
  closing <- ifelse(i == nnodes, "\n],\n\n", ",\n")
  cat (closing, append=T)
}

cat('};', append=T)

sink()




