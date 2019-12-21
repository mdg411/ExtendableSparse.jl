var documenterSearchIndex = {"docs":
[{"location":"#ExtendableSparse-1","page":"Home","title":"ExtendableSparse","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Sparse matrix class with efficient successive insertion of entries.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Without an intermediate data structure, efficient successive insertion/update of entries in random order into a standard compressed colume storage structure appears to be not possible. The package introduces ExtendableSparseMatrix, a delegating wrapper around the Julia standard SparseMatrixCSC struct which contains an additional linked list based (but realised in vectors) temporary extension structure.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"ExtendableSparseMatrix is aimed to work as a drop-in replacement to SparseMatrixCSC in finite element and finite volume codes.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Currently it has the methods required for AbstractSparseMatrix (getindex, setindex!,size,nnz), as well as lufact and mul!, which is already sufficient for a number of interesting applications.","category":"page"},{"location":"changes/#Changes-1","page":"Changes","title":"Changes","text":"","category":"section"},{"location":"changes/#V0.1,-July-2019-1","page":"Changes","title":"V0.1, July 2019","text":"","category":"section"},{"location":"changes/#","page":"Changes","title":"Changes","text":"Initial release","category":"page"},{"location":"api/#API-1","page":"API","title":"API","text":"","category":"section"},{"location":"api/#Types-and-Constants-1","page":"API","title":"Types and Constants","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"Modules = [ExtendableSparse]\nPages = [\"extension.jl\",\"extendable.jl\"]\nOrder = [:type]","category":"page"},{"location":"api/#ExtendableSparse.SparseMatrixExtension","page":"API","title":"ExtendableSparse.SparseMatrixExtension","text":"mutable struct SparseMatrixExtension{Tv, Ti<:Integer} <: SparseArrays.AbstractSparseArray{Tv,Ti<:Integer,2}\n\nStruct to hold extension data of sparse matrix.\n\nm::Integer\nNumber of rows\n\nn::Integer\nNumber of columns\n\nnnz::Integer\nNumber of nonzeros\n\ncolptr::Array{Ti,1} where Ti<:Integer\nLinked list of column entries. Initial length is n, it grows with each new entry.\ncolptr[index] contains the next index in the list or zero, terminating the list which starts at index 1<=j<=n for each column j.\n\nrowval::Array{Ti,1} where Ti<:Integer\nRow numbers. For each index it contains the zero (initial state) or the row numbers corresponding to the column entry list in colptr.\nInitial length is n, it grows with each new entry.\n\nnzval::Array{Tv,1} where Tv\nNonzero entry values correspondin to each pair (colptr[index],rowval[index])\nInitial length is n,  it grows with each new entry.\n\n\n\n\n\n","category":"type"},{"location":"api/#ExtendableSparse.SparseMatrixExtension-Union{Tuple{Ti}, Tuple{Tv}, Tuple{Integer,Integer}} where Ti<:Integer where Tv","page":"API","title":"ExtendableSparse.SparseMatrixExtension","text":"Constructor of empty extension\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.ExtendableSparseMatrix","page":"API","title":"ExtendableSparse.ExtendableSparseMatrix","text":"mutable struct ExtendableSparseMatrix{Tv, Ti<:Integer} <: SparseArrays.AbstractSparseArray{Tv,Ti<:Integer,2}\n\nExtendable sparse matrix. A nonzero  entry of this matrix is contained either in cscmatrix, or in extmatrix, never in both.\n\ncscmatrix::SparseArrays.SparseMatrixCSC\nFinal matrix data\n\nextmatrix::Union{Nothing, SparseMatrixExtension{Tv,Ti}} where Ti<:Integer where Tv\nIntermediate structure holding data of extension\n\n\n\n\n\n","category":"type"},{"location":"api/#ExtendableSparse.ExtendableSparseMatrix-Tuple{Integer,Integer}","page":"API","title":"ExtendableSparse.ExtendableSparseMatrix","text":"ExtendableSparseMatrix(m::Integer, n::Integer) -> ExtendableSparseMatrix{Float64,Int64}\n\n\nCreate empty ExtendablSparseMatrix. This is a pendant to spzeros.\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.ExtendableSparseMatrix-Union{Tuple{SparseMatrixCSC{Tv,Ti}}, Tuple{Ti}, Tuple{Tv}} where Ti<:Integer where Tv","page":"API","title":"ExtendableSparse.ExtendableSparseMatrix","text":"ExtendableSparseMatrix(M)\n\n\nCreate ExtendablSparseMatrix from sparse matrix\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.ExtendableSparseMatrix-Union{Tuple{Ti}, Tuple{Tv}, Tuple{Integer,Integer}} where Ti<:Integer where Tv","page":"API","title":"ExtendableSparse.ExtendableSparseMatrix","text":"ExtendableSparseMatrix(m, n)\n\n\nCreate empty ExtendablSparseMatrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.ExtendableSparseMatrix-Union{Tuple{Ti}, Tuple{Tv}, Tuple{Type{Tv},Type{Ti},Integer,Integer}} where Ti<:Integer where Tv","page":"API","title":"ExtendableSparse.ExtendableSparseMatrix","text":"ExtendableSparseMatrix(?, ?, m, n)\n\n\nCreate empty ExtendablSparseMatrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.ExtendableSparseMatrix-Union{Tuple{Tv}, Tuple{Type{Tv},Integer,Integer}} where Tv","page":"API","title":"ExtendableSparse.ExtendableSparseMatrix","text":"ExtendableSparseMatrix(?::Tv, m::Tv, n::Tv) -> ExtendableSparseMatrix{_1,_2} where _2 where _1\n\n\nCreate empty ExtendablSparseMatrix. This is a pendant to spzeros.\n\n\n\n\n\n","category":"method"},{"location":"api/#","page":"API","title":"API","text":"Modules = [ExtendableSparse]\nPages = [\"extension.jl\",\"extendable.jl\"]\nOrder = [:constant]","category":"page"},{"location":"api/#Methods-1","page":"API","title":"Methods","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"Modules = [ExtendableSparse]\nPages = [\"extension.jl\",\"extendable.jl\", \"sprand.jl\"]\nOrder = [:function]","category":"page"},{"location":"api/#ExtendableSparse.flush!-Union{Tuple{SparseMatrixExtension{Tv,Ti}}, Tuple{Ti}, Tuple{Tv}} where Ti where Tv","page":"API","title":"ExtendableSparse.flush!","text":"Dummy flush! method for Sparse matrix extension. Just used in thest methods\n\n\n\n\n\n","category":"method"},{"location":"api/#SparseArrays.nnz-Tuple{SparseMatrixExtension}","page":"API","title":"SparseArrays.nnz","text":"nnz(E::SparseMatrixExtension) -> Integer\n\n\nReturn number of nonzero entries.\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.colptrs-Tuple{ExtendableSparseMatrix}","page":"API","title":"ExtendableSparse.colptrs","text":"colptrs(E::ExtendableSparseMatrix) -> Array{Ti,1} where Ti<:Integer\n\n\nFlush and delegate to cscmatrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.flush!-Union{Tuple{ExtendableSparseMatrix{Tv,Ti}}, Tuple{Ti}, Tuple{Tv}} where Ti<:Integer where Tv","page":"API","title":"ExtendableSparse.flush!","text":"If there are new entries in extension, create new CSC matrix and reset extension.\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.xcolptrs-Tuple{ExtendableSparseMatrix}","page":"API","title":"ExtendableSparse.xcolptrs","text":"xcolptrs(E::ExtendableSparseMatrix) -> Array{Ti,1} where Ti<:Integer\n\n\nFlush and delegate to cscmatrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#SparseArrays.nnz-Tuple{ExtendableSparseMatrix}","page":"API","title":"SparseArrays.nnz","text":"nnz(E::ExtendableSparseMatrix) -> Any\n\n\nNumber of nonzeros of ExtendableSparseMatrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.sprand!-Union{Tuple{Ti}, Tuple{Tv}, Tuple{AbstractSparseArray{Tv,Ti,2},Int64}} where Ti where Tv","page":"API","title":"ExtendableSparse.sprand!","text":"sprand!(A, xnnz)\n\n\nFill empty sparse matrix A with random nonzero elements from interval [1,2] using incremental assembly.\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.getindex-Union{Tuple{Ti}, Tuple{Tv}, Tuple{SparseMatrixExtension{Tv,Ti},Integer,Integer}} where Ti<:Integer where Tv","page":"API","title":"Base.getindex","text":"getindex(E, i, j)\n\n\nReturn value stored for entry or zero if not found\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.setindex!-Union{Tuple{Ti}, Tuple{Tv}, Tuple{SparseMatrixExtension{Tv,Ti},Any,Integer,Integer}} where Ti<:Integer where Tv","page":"API","title":"Base.setindex!","text":"setindex!(E, _v, _i, _j)\n\n\nUpdate value of existing entry, otherwise extend matrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.size-Tuple{SparseMatrixExtension}","page":"API","title":"Base.size","text":"size(E::SparseMatrixExtension) -> Tuple{Integer,Integer}\n\n\nReturn tuple containing size of the matrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.getindex-Union{Tuple{Ti}, Tuple{Tv}, Tuple{ExtendableSparseMatrix{Tv,Ti},Integer,Integer}} where Ti<:Integer where Tv","page":"API","title":"Base.getindex","text":"getindex(M, i, j)\n\n\nFind index in CSC matrix and return value, if it exists. Otherwise, return value from extension.\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.setindex!-Union{Tuple{Ti}, Tuple{Tv}, Tuple{ExtendableSparseMatrix{Tv,Ti},Any,Integer,Integer}} where Ti<:Integer where Tv","page":"API","title":"Base.setindex!","text":"setindex!(M, v, i, j)\n\n\nFind index in CSC matrix and set value if it exists. Otherwise, set index in extension.\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.size-Tuple{ExtendableSparseMatrix}","page":"API","title":"Base.size","text":"size(E::ExtendableSparseMatrix) -> Tuple{Int64,Int64}\n\n\nSize of ExtendableSparseMatrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#ExtendableSparse.findindex-Union{Tuple{T}, Tuple{SparseMatrixCSC{T,Ti} where Ti<:Integer,Integer,Integer}} where T","page":"API","title":"ExtendableSparse.findindex","text":"findindex(S::T, i::T, j::T)\n\n\nReturn index corresponding to entry (i,j) in the array of nonzeros, if the entry exists, otherwise, return 0.\n\n\n\n\n\n","category":"method"},{"location":"api/#LinearAlgebra.ldiv!-Tuple{AbstractArray{T,1} where T,ExtendableSparseMatrix,AbstractArray{T,1} where T}","page":"API","title":"LinearAlgebra.ldiv!","text":"ldiv!(r::AbstractArray{T,1} where T, E::ExtendableSparseMatrix, x::AbstractArray{T,1} where T)\n\n\nDelegating Matrix ldiv\n\n\n\n\n\n","category":"method"},{"location":"api/#LinearAlgebra.ldiv!-Tuple{AbstractArray{T,2} where T,ExtendableSparseMatrix,AbstractArray{T,2} where T}","page":"API","title":"LinearAlgebra.ldiv!","text":"ldiv!(r::AbstractArray{T,2} where T, E::ExtendableSparseMatrix, x::AbstractArray{T,2} where T)\n\n\nDelegating Matrix ldiv\n\n\n\n\n\n","category":"method"},{"location":"api/#LinearAlgebra.lu-Tuple{ExtendableSparseMatrix}","page":"API","title":"LinearAlgebra.lu","text":"lu(E::ExtendableSparseMatrix) -> Any\n\n\nDelegating LU factorization.\n\n\n\n\n\n","category":"method"},{"location":"api/#LinearAlgebra.mul!-Tuple{AbstractArray{T,1} where T,ExtendableSparseMatrix,AbstractArray{T,1} where T}","page":"API","title":"LinearAlgebra.mul!","text":"mul!(r::AbstractArray{T,1} where T, E::ExtendableSparseMatrix, x::AbstractArray{T,1} where T) -> Any\n\n\nDelegating Matrix multiplication\n\n\n\n\n\n","category":"method"},{"location":"api/#LinearAlgebra.mul!-Tuple{AbstractArray{T,2} where T,ExtendableSparseMatrix,AbstractArray{T,2} where T}","page":"API","title":"LinearAlgebra.mul!","text":"mul!(r::AbstractArray{T,2} where T, E::ExtendableSparseMatrix, x::AbstractArray{T,2} where T) -> Any\n\n\nDelegating Matrix multiplication\n\n\n\n\n\n","category":"method"},{"location":"api/#SparseArrays.findnz-Tuple{ExtendableSparseMatrix}","page":"API","title":"SparseArrays.findnz","text":"findnz(E::ExtendableSparseMatrix) -> Tuple{Any,Any,Any}\n\n\nFlush and delegate to cscmatrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#SparseArrays.nonzeros-Tuple{ExtendableSparseMatrix}","page":"API","title":"SparseArrays.nonzeros","text":"nonzeros(E::ExtendableSparseMatrix) -> Array{Tv,1} where Tv\n\n\nFlush and delegate to cscmatrix.\n\n\n\n\n\n","category":"method"},{"location":"api/#SparseArrays.rowvals-Tuple{ExtendableSparseMatrix}","page":"API","title":"SparseArrays.rowvals","text":"rowvals(E::ExtendableSparseMatrix) -> Array{Ti,1} where Ti<:Integer\n\n\nFlush and delegate to cscmatrix.\n\n\n\n\n\n","category":"method"}]
}