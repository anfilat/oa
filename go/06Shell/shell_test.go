package shell

import (
	"../testutils"
	"fmt"
	"runtime"
	"sort"
	"testing"
)

func TestShellGap(t *testing.T) {
	array := testutils.RandomArray(10000)
	Shell(array, ShellGaps)
	if !sort.IsSorted(sort.Float64Slice(array)) {
		t.Error("Shell gaps")
	}
}

func TestKnuthGaps(t *testing.T) {
	array := testutils.RandomArray(10000)
	Shell(array, KnuthGaps)
	if !sort.IsSorted(sort.Float64Slice(array)) {
		t.Error("Knuth gaps")
	}
}

func TestSedgewickGaps(t *testing.T) {
	array := testutils.RandomArray(10000)
	Shell(array, SedgewickGaps)
	if !sort.IsSorted(sort.Float64Slice(array)) {
		t.Error("Sedgewick gaps")
	}
}

func TestTokudaGaps(t *testing.T) {
	array := testutils.RandomArray(10000)
	Shell(array, TokudaGaps)
	if !sort.IsSorted(sort.Float64Slice(array)) {
		t.Error("Tokuda gaps")
	}
}

func TestBench(t *testing.T) {
	size := 5_000_000

	data := testutils.RandomArray(size)
	array := make([]float64, len(data))

	sorted10p := testutils.CopyArray(data)
	sort.Slice(sorted10p, func(i, j int) bool { return sorted10p[i] < sorted10p[j] })
	testutils.Shuffle(sorted10p, size/10)

	sorted5 := testutils.CopyArray(data)
	sort.Slice(sorted5, func(i, j int) bool { return sorted5[i] < sorted5[j] })
	testutils.Shuffle(sorted5, 5)
	runtime.GC()

	copy(array, data)
	fmt.Printf("ShellGaps random %s\n", testutils.Bench(func() { Shell(array, ShellGaps) }))
	copy(array, sorted10p)
	fmt.Printf("ShellGaps sorted10p %s\n", testutils.Bench(func() { Shell(array, ShellGaps) }))
	copy(array, sorted5)
	fmt.Printf("ShellGaps sorted5 %s\n", testutils.Bench(func() { Shell(array, ShellGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("KnuthGaps random %s\n", testutils.Bench(func() { Shell(array, KnuthGaps) }))
	copy(array, sorted10p)
	fmt.Printf("KnuthGaps sorted10p %s\n", testutils.Bench(func() { Shell(array, KnuthGaps) }))
	copy(array, sorted5)
	fmt.Printf("KnuthGaps sorted5 %s\n", testutils.Bench(func() { Shell(array, KnuthGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("SedgewickGaps random %s\n", testutils.Bench(func() { Shell(array, SedgewickGaps) }))
	copy(array, sorted10p)
	fmt.Printf("SedgewickGaps sorted10p %s\n", testutils.Bench(func() { Shell(array, SedgewickGaps) }))
	copy(array, sorted5)
	fmt.Printf("SedgewickGaps sorted5 %s\n", testutils.Bench(func() { Shell(array, SedgewickGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("TokudaGaps random %s\n", testutils.Bench(func() { Shell(array, TokudaGaps) }))
	copy(array, sorted10p)
	fmt.Printf("TokudaGaps sorted10p %s\n", testutils.Bench(func() { Shell(array, TokudaGaps) }))
	copy(array, sorted5)
	fmt.Printf("TokudaGaps sorted5 %s\n", testutils.Bench(func() { Shell(array, TokudaGaps) }))
	runtime.GC()

	copy(array, data)
	fmt.Printf("system random %s\n", testutils.Bench(func() { sort.Slice(array, func(i, j int) bool { return array[i] < array[j] }) }))
	copy(array, sorted10p)
	fmt.Printf("system sorted10p %s\n", testutils.Bench(func() { sort.Slice(array, func(i, j int) bool { return array[i] < array[j] }) }))
	copy(array, sorted5)
	fmt.Printf("system sorted5 %s\n", testutils.Bench(func() { sort.Slice(array, func(i, j int) bool { return array[i] < array[j] }) }))
}
