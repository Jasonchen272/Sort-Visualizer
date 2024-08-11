import {React, useState, useEffect} from 'react'
import "./SortVisualizer.css"
import { getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations, getBubbleSortAnimations, getStalinSortAnimations } from '../sortAlgorithms/sortAlgorithms'
// import * as sortAlgorithms from '../sortAlgorithms/sortAlgorithms'

const SORT_DELAY_MS = 1
function SortVisualizer() {
    const [arr, setArr] = useState([])
    const [sorting, setSorting] = useState(false)

    useEffect(() => {
        generateNewArray();
      }, []);

    function randIntHelper(lower, upper) {
        //Math.random returns a decimal from 0 to 1 
        //helper will return an int from  lower to upper
        return Math.floor(Math.random() * (upper - lower + 1) + lower)
    }

    function generateNewArray() {
        const array = []
        for (let i = 0; i < 300; i++) {
            array.push(randIntHelper(5, 500))
        }
        setArr(array)
    }

    function mergeSort() {
        //array of items a to be swapped and their order
        console.log(arr)

        const animations = getMergeSortAnimations(arr)
        console.log(arr)
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-value');
            //every 2 and skip 1 value
            const colorChange = i % 3 !== 2;
            //compare animation
            if (colorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                //1st of 2 is red second of 2 is lightblue
                const color = i % 3 === 0 ? 'red' : 'lightblue';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SORT_DELAY_MS);
            } else {
                setTimeout(() => {
                    // swap animation
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * SORT_DELAY_MS)
            }
        }
    }

    

    function quickSort() {

        const animations = getQuickSortAnimations(arr)

        let prevPivot = animations[0][0];
        let newPivot = false;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-value');
            const [pivotIndex, barOneIndex, barTwoIndex] = animations[i]
            if (pivotIndex !== prevPivot) {
                newPivot = true;
                prevPivot = pivotIndex
            }
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            const pivotStyle = arrayBars[pivotIndex].style;
            if (i % 2 === 0) {
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'red'
                    barTwoStyle.backgroundColor = 'red'
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                    pivotStyle.backgroundColor = 'green'
                }, i * SORT_DELAY_MS)
            } else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'lightblue'
                    barTwoStyle.backgroundColor = 'lightblue'
                    if (newPivot) {
                        pivotStyle.backgroundColor = 'lightblue'
                        newPivot = false
                    }
                }, i * SORT_DELAY_MS)

            }
        }
    }

    function arrayBarHeights() {
        const arrayBars = document.getElementsByClassName("array-value")
        for(let i = 1; i < arrayBars.length; i++) {
            const cur = arrayBars[i - 1].style.height
            const next = arrayBars[i].style.height
            if (parseInt(cur.slice(0, -2)) > parseInt(next.slice(0, -2))) {
                console.log(next.slice(0, -2))
            }
        }
        return true;
    }

    function heapSort() {
        console.log(arr)
        const animations = getHeapSortAnimations(arr)
        console.log(arr)
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-value')
            const [barOneIndex, barTwoIndex] = animations[i]
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            if (i % 2 === 0) {
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'red'
                    barTwoStyle.backgroundColor = 'red'
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                }, i * SORT_DELAY_MS)
            } else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'lightblue'
                    barTwoStyle.backgroundColor = 'lightblue'
                }, i * SORT_DELAY_MS)
            }
        }
    }

    function bubbleSort() {
        console.log(arr)
        const animations = getBubbleSortAnimations(arr);
        console.log(arr)
        for (let i = 0; i < animations.length; i ++) {
            const arrayBars = document.getElementsByClassName('array-value')
            const [barOneIndex, barTwoIndex] = animations[i]
            const barOneStyle = arrayBars[barOneIndex].style
            const barTwoStyle = arrayBars[barTwoIndex].style
            if (i % 2 === 0) {
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'red'
                    barTwoStyle.backgroundColor = 'red'
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                }, i * SORT_DELAY_MS)
            } else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'lightblue'
                    barTwoStyle.backgroundColor = 'lightblue'
                }, i * SORT_DELAY_MS)
            }
        }
    }

    function stalinSort() {
        const animations = getStalinSortAnimations(arr) 
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-value')
            if (animations[i].length === 2) {
                const [barOneIndex, barTwoIndex] = animations[i]
                const barOneStyle = arrayBars[barOneIndex].style
                const barTwoStyle = arrayBars[barTwoIndex].style
                if (i % 2 === 0) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = 'red'
                        barTwoStyle.backgroundColor = 'red'
                    }, i * SORT_DELAY_MS)
                } else {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = 'lightblue'
                        barTwoStyle.backgroundColor = 'lightblue'
                    }, i * SORT_DELAY_MS)
                }
            } else {
                const [barOneIndex] = animations[i]
                const barOneStyle = arrayBars[barOneIndex].style
                if (i % 2 ===0) {
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'red'
                }, i * SORT_DELAY_MS)
                } else {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = 'white'
                    }, i * SORT_DELAY_MS)
                }
            }
        }
    }

    async function doSort(sortFunc) {
        setSorting(true)
        await sortFunc();
        setSorting(false)

    }

    function testSort() {
        console.log(arrayBarHeights())

        // for (let i = 0; i < 100; i ++ ) {
        //     const array = []
        //     const length = randIntHelper(1, 100)
        //     for (let j = 0; j < length; j++) {
        //         array.push(randIntHelper(-1000, 1000))
        //     }
        //     const correct = array.slice().sort((a, b) => a - b)
        //     const sorted = getQuickSortAnimations(array.slice())
        //     // console.log(array, sorted, correct)
        //     console.log(arrayEqual(correct, sorted))
        // }
    }

    function arrayEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i]  !== arr2[i]) return false;
        }
        return true;
    }



    return (
        <div className='array-container'>
            {arr.map((val, i) => (
                <div 
                className="array-value" 
                key={i}
                style={{height: `${val}px`}}></div>
            ))}
            <div>
                <button className="buttons" onClick={generateNewArray} disabled={sorting}>Generate New Array</button>
                <button className="buttons" onClick={mergeSort} disabled={sorting}>Merge Sort</button>
                <button className="buttons" onClick={quickSort} disabled={sorting}>Quick Sort</button>
                <button className="buttons" onClick={heapSort} disabled={sorting}>Heap Sort</button>
                <button className="buttons" onClick={bubbleSort} disabled={sorting}>Bubble Sort</button>
                {/* <button className="buttons" onClick={stalinSort} disabled={sorting}>Stalin Sort</button> */}
                <button className="buttons" onClick={testSort} disabled={sorting}>Test Sorting</button>
            </div>

        </div>
    )
}

export default SortVisualizer