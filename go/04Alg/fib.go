package alg

import (
	"math"
	"math/big"
)

func FibRec(n int) int {
	if n < 3 {
		return 1
	}
	return FibRec(n-1) + FibRec(n-2)
}

func FibIter(n int) int {
	f := 1
	fMinus1 := 1
	for i := 3; i <= n; i++ {
		fMinus1, f = f, f+fMinus1
	}
	return f
}

func FibIterBig(n int) big.Int {
	f := big.NewInt(1)
	fMinus1 := big.NewInt(1)
	for i := 3; i <= n; i++ {
		fMinus1.Add(fMinus1, f)
		fMinus1, f = f, fMinus1
	}
	return *f
}

func FibGoldenSection(n int) int {
	return int(math.Floor(0.5 + math.Pow(math.Phi, float64(n))/math.Sqrt(5)))
}

func FibMatrix(n int) int {
	multiply := func(m, n [4]int) [4]int {
		return [4]int{
			m[0]*n[0] + m[1]*n[2],
			m[0]*n[1] + m[1]*n[3],
			m[2]*n[0] + m[3]*n[2],
			m[2]*n[1] + m[3]*n[3],
		}
	}

	if n < 3 {
		return 1
	}

	n -= 2
	base := [4]int{0, 1, 1, 1}
	res := [4]int{0, 1, 1, 1}
	for n > 1 {
		if n%2 == 1 {
			res = multiply(res, base)
		}
		base = multiply(base, base)
		n /= 2
	}
	if n > 0 {
		res = multiply(res, base)
	}
	return res[3]
}
