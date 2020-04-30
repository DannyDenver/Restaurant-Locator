import { Restaurant } from "../models/Restaurant";

function pivot(restaurants: Restaurant[], start=0, end=restaurants.length - 1) {
    function swap(restaurants: Restaurant[], i:number, j: number) {
        var temp = restaurants[i];
        restaurants[i] = restaurants[j];
        restaurants[j] = temp;
    }

    var pivot = restaurants[start];
    var swapIndex = start;

    for(var i = start + 1; i <= end; i++) {
        if (pivot.name > restaurants[i].name) {
            swapIndex++;
            swap(restaurants, swapIndex, i);
        }
    }

    swap(restaurants, start, swapIndex);
    return swapIndex;
}

export function quickSort(restaurants: Restaurant[], left = 0, right = restaurants.length - 1) {
    if (left < right) {
        let pivotIndex = pivot(restaurants, left, right);
        // left 
        quickSort(restaurants, left, pivotIndex - 1);
        //right
        quickSort(restaurants, pivotIndex + 1, right);
    }

    return restaurants;
}