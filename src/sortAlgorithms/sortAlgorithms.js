//================= MERGE SORT =================
export function getMergeSortAnimations(array) {
    const animations = [];
    //no sorting needed 
    if (array.length <= 1) return array;
    const copy = array.slice();
    mergeSortHelper(array, 0, array.length - 1, copy, animations);
    console.log(testSort(array))

    return animations;
}

function mergeSortHelper(origArray, startIdx, endIdx, copyArr, animations) {
    //len 1 arrays 
    if (startIdx === endIdx) return;
    const mid = Math.floor((startIdx + endIdx) / 2);
    //first half of merge
    mergeSortHelper(copyArr, startIdx, mid, origArray, animations);
    //second half of merge
    mergeSortHelper(copyArr, mid + 1, endIdx, origArray, animations);
    //merge 2 halves
    merge(origArray, startIdx, mid, endIdx, copyArr, animations);
};

function merge(origArray, start, mid, end, copyArr, animations) {
    let k = start;
    let i = start;
    let j = mid + 1;
    //merge in order
    while (i <= mid && j <= end) {
        //i and j are 2 indexes that need to be swapped
        //k is the current index we are inserting in
        animations.push([i, j]);
        animations.push([i, j]);
        if (copyArr[i] <= copyArr[j]) {
            animations.push([k, copyArr[i]]);
            origArray[k++] = copyArr[i++];
        } else {
            animations.push([k, copyArr[j]]);
            origArray[k++] = copyArr[j++];
        } 
    }
    //put rest of it in array
    //one of these wont execute
    while (i <= mid) {
        animations.push([i, i]);
        animations.push([i, i]);

        animations.push([k, copyArr[i]])
        origArray[k++] =  copyArr[i++]
    }
    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);

        animations.push([k, copyArr[j]])
        origArray[k++] =  copyArr[j++]
    }
}
//================= QUICK SORT =================
export function getQuickSortAnimations(array) {
    console.log("========================")
    const animations = []
    if (array.length <= 1) {
        return array
    }
    quickSortHelper(array, 0, array.length - 1, animations);
    // console.log(testSort(array))
    return animations;
}

function quickSortHelper (array, low, high, animations) {
    if (low >= high || low < 0) {
        return
    }
    
    const part = partition(array, low, high, animations) 
    quickSortHelper(array, low, part - 1, animations)
    quickSortHelper(array, part + 1, high, animations)
}

function findMiddleIndex(a, b, c) {
    if ((a < b && b < c) || (c < b && b < a)) {
        return 1;
    } else if ((b < a && a < c) || (c < a && a < b)) {
        return 0; 
    } else {
        return 2;
    }
}

function partition(array, low, high, animations) {
    const mid = Math.floor((high - low) / 2)
    // 3 possible indexes
    const pivotCandidates = [low, mid, high]
    // middle number of 3 indexes
    const pivotIdx = findMiddleIndex(array[low], array[mid], array[high])
    const candidateIdx = pivotCandidates[pivotIdx]
    const pivot = array[candidateIdx]

    if (high !== candidateIdx) {
        animations.push([high, high, candidateIdx])
        animations.push([high, high, candidateIdx])
        swap(array, high, candidateIdx)
    }
    console.log(array[high])
    let i = low
    for (let j = low; j < high; j++) {
        if (array[j] <= pivot) {
            animations.push([high, i, j])
            animations.push([high, i, j])
            swap(array, i, j)
            i += 1
        }
    }
    swap(array, i, high)
    animations.push([high, i, high])
    animations.push([high, i, high])

    return i
}
//swap i and j indexes in array
function swap(array, i, j) {
    if (i === j) { return }
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

//================= HEAP SORT =================
export function getHeapSortAnimations(array) {
    const animations = []
    if (array.length <= 1) {
        return array
    }
    buildMaxHeap(array, animations)
    let heapSize = array.length - 1;
    for (let i = array.length - 1; i >= 1; i--) {
        animations.push([i, 0])
        animations.push([i, 0])
        swap(array, 0, i);
        heapSize -= 1
        maxHeapify(array, 0, heapSize, animations)

    }
    console.log(testSort(array))
    return animations
}

function buildMaxHeap(array, animations) {
    let heapSize = array.length
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        maxHeapify(array, i, heapSize, animations)
    } 
}

function maxHeapify(array, i, heapSize, animations) {
    let left = i * 2 + 1
    let right = i * 2 + 2
    let largest;
    if (left <= heapSize && array[left] > array[i]) {
        largest = left
    } else {
        largest = i
    }

    if (right <= heapSize && array[right] > array[largest]) {
        largest = right
    }

    if (largest !== i) {
        animations.push([largest, i])
        animations.push([largest, i])

        swap(array, largest, i)
        maxHeapify(array, largest, heapSize, animations)
    }
}

function testMaxHeap(array) {
    for (let i = 0; i < array.length; i++) {
        if (i * 2 + 1 < array.length) {
            if (array[i * 2 + 1] > array[i]) {
                return false;
            }
        }
        if (i * 2 + 2 < array.length) {
            if (array[i * 2 + 2] > array[i]) {
                return false;
            }
        }
    }
    return true;
}

//================= BUBBLE SORT =================
export function getBubbleSortAnimations(array) {
    const animations = [];
    //no sorting needed 
    if (array.length <= 1) return array;
    let n = array.length;
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let j = 1; j < n; j++) {
            if (array[j - 1] > array[j]) {
                animations.push([j - 1, j])
                animations.push([j - 1, j])
                swap(array, j - 1, j)
                swapped = true
            }
        }
        n -= 1
    }
    console.log(testSort(array))
    return animations
}


function testSort(array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
            return false;
        }
    }
    return true;
}

//================= COCKTAIL SORT =================

export function getCocktailSortAnimations(array) {
    const animations = [];
    //no sorting needed 
    if (array.length <= 1) return array;
    let r = array.length - 1;
    let l = 0;
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < r; i++) {
            if (array[i] > array[i + 1]) {
                animations.push([i, i + 1])
                animations.push([i, i + 1])
                swap(array, i, i + 1)
                swapped = true
            }
        }
        r -= 1;
        if(!swapped) {
            break
        }
        swapped = false
        for (let i = r; i >= l; i--) {
            if (array[i] > array[i + 1] ) {
                animations.push([i, i + 1])
                animations.push([i, i + 1])
                swap(array, i, i + 1)
                swapped = true
            }
        }
        l += 1;
    }
    return animations;

}

export function getSelectionSortAnimations(array) {
    const animations = []
    for (let i = 0; i < array.length; i++) {
        let minimum = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minimum]) {
                minimum = j;
            }
        }
        animations.push([minimum, i])
        animations.push([minimum, i])
        swap(array, minimum, i)
    }
    console.log(testSort(array))
    return animations;
}
