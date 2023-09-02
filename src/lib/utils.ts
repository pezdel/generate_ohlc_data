import { UnixDate, Rfc3339Date, DateTime, BaseDate } from '$lib/dateClasses'
import type { UserDataVals } from '$lib/types';


const getRandomValue = (min: number, max: number, float: boolean) => {
    if (float) {
        const num = Math.random() * (max - min) + min
        return parseFloat(num.toFixed(5))
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

const getDateClass = (start: Date, format: string): BaseDate => {
    if (format === "Unix") {
        return new UnixDate(start)
    } else if (format === "RFC3339") {
        return new Rfc3339Date(start)
    } else {
        return new DateTime(start)
    }
}


export const generateData = (data: UserDataVals) => {
    const { startDate, dateFormat, count, float, low, high } = data

    const ohlc = []
    let prevClose = 0

    const dateObj: BaseDate = getDateClass(startDate, dateFormat)
    for (let i = 0; i < count; i++) {
        if (i !== 0) {
            dateObj.next()
        }


        let _open
        if (prevClose == 0) {
            _open = getRandomValue(low, high, float)
        } else {
            _open = prevClose
        }
        const _high = getRandomValue(_open, high, float)
        const _low = getRandomValue(low, _open, float)
        const _close = getRandomValue(_low, _high, float)
        const _volumn = getRandomValue(0, 1000, false)
        prevClose = _close
        ohlc.push([dateObj.getCurrentDate(), _open, _high, _low, _close, _volumn])
    }
    return ohlc
}




///ROW VALS
// rowVals: writable([
// 			{ clicked: true, name: 'Dates' },
// 			{ clicked: true, name: 'Open' },
// 			{ clicked: true, name: 'High' },
// 			{ clicked: true, name: 'Low' },
// 			{ clicked: true, name: 'Close' },
// 			{ clicked: true, name: 'Volumn' }
// 		])
// const moveDown = (i: number) => {
// 	const _rowVals = $rowVals;
// 	const _val = _rowVals.splice(i, 1)[0];
// 	_rowVals.splice(i + 1, 0, _val);
// 	rowVals.set(_rowVals);
// };
// const moveUp = (i: number) => {
// 	const _rowVals = $rowVals;
// 	const _val = _rowVals.splice(i, 1)[0];
// 	_rowVals.splice(i - 1, 0, _val);
// 	rowVals.set(_rowVals);
// };
// const toggleVals = (i: number) => {
// 	$rowVals[i].clicked = !$rowVals[i].clicked;
// 	const idx = $rowVals.findIndex((val) => val.clicked);
// 	const revIdx = $rowVals.findLastIndex((val) => val.clicked);
// 	if (idx === revIdx) {
// 		$start = i;
// 		$end = i;
// 	}
// 	if (i == $start) {
// 		$start = idx;
// 	} else if (i == $end) {
// 		$end = revIdx;
// 	} else if (i > $end) {
// 		$end = i;
// 	} else if (i < $start) {
// 		$start = i;
// 	}
// };
//---------------------WEEKEND
// <!-- <div class="flex w-full justify-center text-3xl border-b-2 pt-5">Rows</div> -->
// <!-- <div class="flex space-x-2"> -->
// <!-- 	{#each $rowVals as item, i} -->
// <!-- 		<div class="flex flex-col space-x-5 items-center"> -->
// <!-- 			<div class="flex w-full justify-center space-x-2"> -->
// <!-- 				<label class="flex items-center space-x-2"> -->
// <!-- 					<input -->
// <!-- 						class="checkbox" -->
// <!-- 						type="checkbox" -->
// <!-- 						checked={item.clicked} -->
// <!-- 						on:click={() => toggleVals(i)} -->
// <!-- 					/> -->
// <!-- 				</label> -->
// <!-- 				<p class={`${!item.clicked ? 'text-gray-600' : ''}`}>{item.name}</p> -->
// <!-- 			</div> -->
// <!-- 			<div class="flex"> -->
// <!-- 				<button -->
// <!-- 					class="" -->
// <!-- 					disabled={i === $start || !item.clicked} -->
// <!-- 					on:click={() => moveUp(i)} -->
// <!-- 				> -->
// <!-- 					<iconify-icon -->
// <!-- 						icon="mdi:arrow-left" -->
// <!-- 						class={`${i === $start || !item.clicked ? 'text-gray-600' : ''}`} -->
// <!-- 					/> -->
// <!-- 				</button> -->
// <!-- 				<button -->
// <!-- 					class="" -->
// <!-- 					disabled={i === $end || !item.clicked} -->
// <!-- 					on:click={() => moveDown(i)} -->
// <!-- 				> -->
// <!-- 					<iconify-icon -->
// <!-- 						icon="mdi:arrow-right" -->
// <!-- 						class={`${i === $end || !item.clicked ? 'text-gray-600' : ''}`} -->
// <!-- 					/> -->
// <!-- 				</button> -->
// <!-- 			</div> -->
// <!-- 		</div> -->
// <!-- 	{/each} -->
// <!-- </div> -->
//<!-- <div class="flex p-3 space-x-2"> -->
// <!-- 	<span>Weekends:</span> -->
// <!-- 	<div class="space-y-2"> -->
// <!-- 		<label class="flex items-center space-x-2"> -->
// <!-- 			<input -->
// <!-- 				class="radio" -->
// <!-- 				type="radio" -->
// <!-- 				checked -->
// <!-- 				name="radio-direct" -->
// <!-- 				bind:group={$weekend} -->
// <!-- 				value="None" -->
// <!-- 			/> -->
// <!-- 			<p>24/7 (None)</p> -->
// <!-- 		</label> -->
// <!-- 		<label class="flex items-center space-x-2"> -->
// <!-- 			<input -->
// <!-- 				class="radio" -->
// <!-- 				type="radio" -->
// <!-- 				name="radio-direct" -->
// <!-- 				value="Stocks" -->
// <!-- 				bind:group={$weekend} -->
// <!-- 			/> -->
// <!-- 			<p>9:30-4 Est M-F (Stocks)</p> -->
// <!-- 		</label> -->
// <!-- 		<label class="flex items-center space-x-2"> -->
// <!-- 			<input -->
// <!-- 				class="radio" -->
// <!-- 				type="radio" -->
// <!-- 				name="radio-direct" -->
// <!-- 				value="Forex" -->
// <!-- 				bind:group={$weekend} -->
// <!-- 			/> -->
// <!-- 			<p>24/5 Sun-F (Forex/Futures)</p> -->
// <!-- 		</label> -->
// <!-- 	</div> -->
// <!-- </div> -->
//
// --------------------TIMEFRAME
//<div class="flex p-3 items-center space-x-2">
// 	<span>Timeframe: </span>
// 	<select class="select" bind:value={$timeframe}>
// 		<option value="5M">5 Min</option>
// 		<option value="15M">15 Min</option>
// 		<option value="1H">1 Hour</option>
// 		<option value="D">Daily</option>
// 	</select>
// </div>
