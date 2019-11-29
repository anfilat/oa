package search

import (
	"../../testutils"
	"fmt"
	"runtime"
	"testing"
)

func TestSelectBySort(t *testing.T) {
	array := []float64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	med := SelectBySort(array, 7)
	if med != 6 {
		t.Errorf("SelectBySort %v", med)
	}
}

func TestSelectMin(t *testing.T) {
	array := []float64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	med := SelectMin(array)
	if med != 0 {
		t.Errorf("SelectMin %v", med)
	}
}

func TestRSelect(t *testing.T) {
	array := []float64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	med := RSelect(array, 7)
	if med != 6 {
		t.Errorf("RSelect %v", med)
	}
}

func TestDSelect(t *testing.T) {
	array := []float64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	med := DSelect(array, 7)
	if med != 6 {
		t.Errorf("DSelect %v", med)
	}
}

func TestBench(t *testing.T) {
	benchWithSize(10, 3)
	benchWithSize(1_000, 333)
	benchWithSize(1_000_000, 333_333)
	benchWithSize(100_000_000, 33_333_333)
}

func benchWithSize(size int, k int) {
	fmt.Println(size)

	data := testutils.RandomArray(size)

	array := make([]float64, len(data))

	copy(array, data)
	fmt.Printf("select min   random %s\n", testutils.Bench(func() { SelectMin(array) }))

	copy(array, data)
	fmt.Printf("RSelect   random %s\n", testutils.Bench(func() { RSelect(array, k) }))

	copy(array, data)
	fmt.Printf("DSelect   random %s\n", testutils.Bench(func() { DSelect(array, k) }))

	copy(array, data)
	fmt.Printf("sort   random %s\n", testutils.Bench(func() { SelectBySort(array, k) }))

	runtime.GC()
}
