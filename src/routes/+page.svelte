<script lang="ts">
	import { DateInput } from 'date-picker-svelte';
	import { writable } from 'svelte/store';
	import { withPrevious } from 'svelte-previous';
	import { generateData } from '$lib/utils';
	import { get } from 'svelte/store';
	import 'iconify-icon';
	import type { UserData, UserDataVals } from '$lib/types';

	const saveFormat = writable('CSV');
	let userData: UserData = {
		startDate: writable(new Date('2020-01-02 18:00:00')),
		dateFormat: writable('Unix'),
		count: writable(1000),
		float: writable(true),
		low: writable(5),
		high: writable(10)
	};
	const { startDate, dateFormat, count, float, low, high } = userData;
	const [currentLow, previousLow] = withPrevious(5);
	const [currentHigh, previousHigh] = withPrevious(10);

	const updateHighLow = () => {
		if ($currentLow < 0) {
			$currentLow = 0;
		} else if ($currentLow >= $currentHigh) {
			$currentLow = $previousLow ? $previousLow : 5;
			$low = $previousLow ? $previousLow : 5;
		} else if ($currentHigh <= $currentLow) {
			$currentHigh = $previousHigh ? $previousHigh : 10;
			$high = $previousHigh ? $previousHigh : 10;
		}
	};
	const updateCount = () => {
		if ($count > 5000) {
			$count = 5000;
		} else if ($count < 0) {
			$count = 0;
		}
	};

	const extractRealVals = (obj: any) => {
		const res = {};
		for (const key in obj) {
			//@ts-ignore
			res[key] = get(obj[key]);
		}
		return res as UserDataVals;
	};

	function convertToCSV(data: any) {
		const csv = data.map((row) => Object.values(row).join(',')).join('\n');
		return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
	}
	const saveCsv = (csvData: any) => {
		const downloadLink = document.createElement('a');
		downloadLink.href = csvData;
		downloadLink.download = 'data.csv'; // You can change the filename here
		downloadLink.style.display = 'none';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};
	const saveJson = (jsonString: any) => {
		const downloadLink = document.createElement('a');
		downloadLink.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString);
		downloadLink.download = 'data.json'; // You can change the filename here
		downloadLink.style.display = 'none';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	import * as XLSX from 'xlsx';
	const saveExcel = (blob: any) => {
		const downloadLink = document.createElement('a');
		downloadLink.href = window.URL.createObjectURL(blob);
		downloadLink.download = 'data.xlsx'; // You can change the filename here
		downloadLink.style.display = 'none';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const submit = () => {
		const _userData = extractRealVals(userData);
		const data = generateData(_userData);

		if ($saveFormat === 'CSV') {
			const csvData = convertToCSV(data);
			saveCsv(csvData);
		} else if ($saveFormat === 'JSON') {
			const jsonString = JSON.stringify(data, null, 2);
			saveJson(jsonString);
		} else {
			const wb = XLSX.utils.book_new();
			const ws = XLSX.utils.json_to_sheet(data);
			XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
			const blob = XLSX.writeFile(wb, 'ohlc.xlsx');
			saveExcel(blob);
		}
	};
</script>

<div class="flex w-screen h-screen">
	<div class="flex flex-col items-center w-full h-full justify-center">
		<form class="card p-4">
			<div id="Params" class="">
				<div class="flex w-full justify-center text-3xl border-b-2">Date</div>
				<div class="flex p-3 items-center space-x-2">
					<span>Start Date: </span>
					<DateInput bind:value={$startDate} format="yyyy-MM-dd" />
				</div>
				<div class="flex p-3 items-center space-x-2">
					<span>Date Format: </span>
					<select class="select" bind:value={$dateFormat}>
						<option value="Unix">1693602921 (UNIX)</option>
						<option value="RFC3339">2023-09-01T14:30:00.000Z (RFC3339)</option>
						<option value="DateTime">2023-09-01 18:00:00 (Date and Time)</option>
					</select>
				</div>
				<div class="flex p-3 items-center space-x-2 p-3">
					<span class="w-14">Count:</span>
					<input class="input" type="number" bind:value={$count} on:input={updateCount} />
				</div>
				<div class="flex w-full justify-center pt-6 text-3xl border-b-2">Price</div>
				<div class="flex items-center space-x-2 p-3">
					<span class="w-14">High:</span>
					<input class="input" type="number" bind:value={$currentHigh} on:input={updateHighLow} />
				</div>
				<div class="flex items-center space-x-2 p-3">
					<span class="w-14">Low:</span>
					<input class="input" type="number" bind:value={$currentLow} on:input={updateHighLow} />
				</div>
				<div class="flex p-3 space-x-2">
					<span>Floats (0.xxxx) :</span>
					<div class="flex space-x-4 items-center">
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={$float} />
						</label>
					</div>
				</div>
			</div>
			<div class="flex flex-col space-y-4 pt-6 items-center w-full">
				<div class="flex items-center space-x-2 px-3 w-full justify-center">
					<span class="w-14">Format:</span>
					<select class="select w-32" bind:value={$saveFormat}>
						<option value="CSV">CSV</option>
						<option value="JSON">JSON</option>
						<option value="EXCEL">Excel</option>
					</select>
				</div>
				<button on:click={submit} class="btn variant-filled w-48"> Submit </button>
			</div>
		</form>
	</div>
	<div class="flex flex-col bg-red-200" />
</div>
