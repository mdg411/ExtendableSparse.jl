"""
$(TYPEDEF)

Default Julia LU Factorization based on umfpack.
"""
mutable struct ExtendableSparseUmfpackLU{Tv, Ti} <: AbstractExtendableSparseLU{Tv,Ti}
    A::ExtendableSparseMatrix{Tv,Ti}
    umfpacklu::SuiteSparse.UMFPACK.UmfpackLU{Tv,Ti}
    phash::UInt64
end

"""
$(SIGNATURES)
"""
function ExtendableSparseUmfpackLU(A::ExtendableSparseMatrix{Tv,Ti}) where {Tv,Ti}
    flush!(A)
    ExtendableSparseUmfpackLU(A,lu(A.cscmatrix),A.phash)
end


update!(lufact::ExtendableSparseUmfpackLU)=factorize!(lufact,lufact.A)


function factorize!(lufact::ExtendableSparseUmfpackLU, A::ExtendableSparseMatrix; kwargs...)
    flush!(A)
    if A.phash!=lufact.phash
        lufact.umfpacklu=lu(A.cscmatrix)
        lufact.phash=A.phash
    else
        lufact.umfpacklu=lu!(lufact.umfpacklu,A.cscmatrix)
    end
    lufact
end



function LinearAlgebra.ldiv!(u::AbstractArray{T,1} where T, lufact::ExtendableSparseUmfpackLU, v::AbstractArray{T,1} where T)
    ldiv!(u, lufact.umfpacklu, v)
end

LinearAlgebra.ldiv!(lufact::ExtendableSparseUmfpackLU, v::AbstractArray{T,1} where T)=ldiv!(v,lufact, copy(v))

