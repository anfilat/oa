package alg

import (
	"testing"
)

var cases = [][]int{
	{0, 0, 0},
	{0, 5, 5},
	{5, 0, 5},
	{320, 45, 5},
	{45, 320, 5},
	{180, 51, 3},
	{1234567890, 12345, 15},
	{1234567890, 123456789, 123456789},
	{1234560, 30, 30},
}

func TestGCDMinus(t *testing.T) {
	for _, vars := range cases {
		if GcdMinus(vars[0], vars[1]) != vars[2] {
			t.Error(vars[0], vars[1])
		}
	}
}

func TestGCDDiv(t *testing.T) {
	for _, vars := range cases {
		if GcdDiv(vars[0], vars[1]) != vars[2] {
			t.Error(vars[0], vars[1])
		}
	}
}

func TestGCDBinary(t *testing.T) {
	for _, vars := range cases {
		if GcdBinary(vars[0], vars[1]) != vars[2] {
			t.Error(vars[0], vars[1])
		}
	}
}

func BenchmarkGCDMinus_1234567890_12345(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdMinus(1234567890, 12345)
	}
}

func BenchmarkGCDMinus_1234567890_123456789(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdMinus(1234567890, 123456789)
	}
}

func BenchmarkGCDMinus_1234567800_100(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdMinus(1234567800, 100)
	}
}

func BenchmarkGCDMinus_1234567800_10(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdMinus(1234567800, 10)
	}
}

func BenchmarkGCDMinus_1234567800_1(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdMinus(1234567800, 1)
	}
}

func BenchmarkGCDMinus_3221225469_3(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdMinus(3221225469, 3)
	}
}

func BenchmarkGCDDiv_1234567890_12345(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdDiv(1234567890, 12345)
	}
}

func BenchmarkGCDDiv_1234567890_123456789(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdDiv(1234567890, 123456789)
	}
}

func BenchmarkGCDDiv_1234567800_100(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdDiv(1234567800, 100)
	}
}

func BenchmarkGCDDiv_1234567800_10(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdDiv(1234567800, 10)
	}
}

func BenchmarkGCDDiv_1234567800_1(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdDiv(1234567800, 1)
	}
}

func BenchmarkGCDDiv_3221225469_3(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdDiv(3221225469, 3)
	}
}

func BenchmarkGCDBinary_1234567890_12345(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdBinary(1234567890, 12345)
	}
}

func BenchmarkGCDBinary_1234567890_123456789(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdBinary(1234567890, 123456789)
	}
}

func BenchmarkGCDBinary_1234567800_100(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdBinary(1234567800, 100)
	}
}

func BenchmarkGCDBinary_1234567800_10(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdBinary(1234567800, 10)
	}
}

func BenchmarkGCDBinary_1234567800_1(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdBinary(1234567800, 1)
	}
}

func BenchmarkGCDBinary_3221225469_3(b *testing.B) {
	for i := 0; i < b.N; i++ {
		GcdBinary(3221225469, 3)
	}
}
