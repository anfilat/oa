package alg

import (
	"math/big"
	"testing"
)

var fibCases = [][]int{
	{1, 1},
	{2, 1},
	{3, 2},
	{4, 3},
	{11, 89},
	{20, 6765},
}

func TestFibRec(t *testing.T) {
	for _, vars := range fibCases {
		result := FibRec(vars[0])
		if result != vars[1] {
			t.Errorf("fib rec(%d) == %d, expected %d", vars[0], result, vars[1])
		}
	}
}

func TestFibIter(t *testing.T) {
	for _, vars := range fibCases {
		result := FibIter(vars[0])
		if result != vars[1] {
			t.Errorf("fib iter(%d) == %d, expected %d", vars[0], result, vars[1])
		}
	}
}

func TestFibIterBig(t *testing.T) {
	for _, vars := range fibCases {
		result := FibIterBig(vars[0])
		if result.Cmp(big.NewInt(int64(vars[1]))) != 0 {
			t.Errorf("fib iterBig(%d) == %v, expected %d", vars[0], result, vars[1])
		}
	}
}

func TestFibGoldenSection(t *testing.T) {
	for _, vars := range fibCases {
		result := FibGoldenSection(vars[0])
		if result != vars[1] {
			t.Errorf("fib iter(%d) == %d, expected %d", vars[0], result, vars[1])
		}
	}
}

func TestFibMatrix(t *testing.T) {
	for _, vars := range fibCases {
		result := FibMatrix(vars[0])
		if result != vars[1] {
			t.Errorf("fib iter(%d) == %d, expected %d", vars[0], result, vars[1])
		}
	}
}

func TestMaxIntFib90(t *testing.T) {
	result := FibIter(90)
	expected := FibIterBig(90)
	if int64(result) != expected.Int64() {
		t.Errorf("fib max int(%d) == %d, expected %v", 90, result, expected)
	}
}

func TestFibMaxFloat75(t *testing.T) {
	result := FibGoldenSection(75)
	expected := FibIter(75)
	if result != expected {
		t.Errorf("fib max float(%d) == %d, expected %d", 75, result, expected)
	}
}

func BenchmarkFibRec10(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibRec(10)
	}
}

func BenchmarkFibRec30(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibRec(30)
	}
}

func BenchmarkFibIter10(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIter(10)
	}
}

func BenchmarkFibIter30(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIter(30)
	}
}

func BenchmarkFibIter75(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIter(75)
	}
}

func BenchmarkFibIter90(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIter(90)
	}
}

func BenchmarkFibIterBig10(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIterBig(10)
	}
}

func BenchmarkFibIterBig30(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIterBig(30)
	}
}

func BenchmarkFibIterBig75(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIterBig(75)
	}
}

func BenchmarkFibIterBig90(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIterBig(90)
	}
}

func BenchmarkFibIterBig300(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibIterBig(300)
	}
}

func BenchmarkFibGoldenSection10(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibGoldenSection(10)
	}
}

func BenchmarkFibGoldenSection30(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibGoldenSection(30)
	}
}

func BenchmarkFibGoldenSection75(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibGoldenSection(75)
	}
}

func BenchmarkFibMatrix10(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibMatrix(10)
	}
}

func BenchmarkFibMatrix30(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibMatrix(30)
	}
}

func BenchmarkFibMatrix75(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibMatrix(75)
	}
}

func BenchmarkFibMatrix90(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FibMatrix(90)
	}
}
