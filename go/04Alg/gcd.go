package alg

func GcdMinus(a, b int) int {
	if a == 0 {
		return b
	}
	if b == 0 {
		return a
	}

	for a != b {
		if a > b {
			a -= b
		} else {
			b -= a
		}
	}
	return a
}

func GcdDiv(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

// https://en.wikipedia.org/wiki/Binary_GCD_algorithm
func GcdBinary(a, b int) int {
	if a == b {
		return a
	}
	if a == 0 {
		return b
	}
	if b == 0 {
		return a
	}

	shift := 0

	for ((a | b) & 1) == 0 {
		shift++
		a >>= 1
		b >>= 1
	}
	for (a & 1) == 0 {
		a >>= 1
	}
	for b != 0 {
		for (b & 1) == 0 {
			b >>= 1
		}

		if a > b {
			a, b = b, a
		}

		b -= a
	}

	return a << shift
}
