package heap

import (
	"../06Shell"
	"../testutils"
	"fmt"
	"runtime"
	"sort"
	"testing"
)

func TestHeap(t *testing.T) {
	array := testutils.RandomArray(10000)
	Heap(array)
	if !sort.IsSorted(sort.Float64Slice(array)) {
		t.Error("Shell gaps")
	}
}

func TestBench(t *testing.T) {
	benchWithSize(100_000)
	benchWithSize(1_000_000)
	benchWithSize(10_000_000)
}

func benchWithSize(size int) {
	fmt.Println(size)

	data := testutils.RandomArray(size)
	array := make([]float64, len(data))

	sorted5p := testutils.CopyArray(data)
	sort.Slice(sorted5p, func(i, j int) bool { return sorted5p[i] < sorted5p[j] })
	testutils.Shuffle(sorted5p, size/20)
	runtime.GC()

	copy(array, data)
	fmt.Printf("TokudaGaps random %s\n", testutils.Bench(func() { shell.Shell(array, shell.TokudaGaps) }))
	copy(array, sorted5p)
	fmt.Printf("TokudaGaps sorted5p %s\n", testutils.Bench(func() { shell.Shell(array, shell.TokudaGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("Heap random %s\n", testutils.Bench(func() { Heap(array) }))
	copy(array, sorted5p)
	fmt.Printf("Heap sorted5p %s\n", testutils.Bench(func() { Heap(array) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("system random %s\n", testutils.Bench(func() { sort.Slice(array, func(i, j int) bool { return array[i] < array[j] }) }))
	copy(array, sorted5p)
	fmt.Printf("system sorted5p %s\n", testutils.Bench(func() { sort.Slice(array, func(i, j int) bool { return array[i] < array[j] }) }))
	runtime.GC()
}
