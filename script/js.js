$(document).ready(function () {

	window.onbeforeunload = function() {
		return "Dude, are you sure you want to leave? Think of the kittens!";
	}

	$('#myTable').hide();
	var init = true;
	// click on button submit
	$("#create").on('click', function (e) {

		var params = [];
		var table = $("table tr").get();
		var column =  $("th", table[0]).get();
		var error = false;

		for (var i = 1; i < table.length; i++) {

			var usedPoints = [];
			var item = {};
			var tableCellsArray = $("td", table[i]).get();
			var row = $(tableCellsArray[0], this).text();

			item[row] = {};

			for (var z=1; z < tableCellsArray.length; z++) {
				var singleColumn = $(column[z], this).text();
				var value = $('select', tableCellsArray[z], this).val();
				console.log(value);
				var lastIndex = usedPoints.indexOf(value);
				//TODO meta check that all values are chosen
				//value != 0
				if (lastIndex != -1){
					error = true;
					$('select', tableCellsArray[lastIndex + 1], this).addClass('something');
					$('select', tableCellsArray[z], this).addClass('something');

				}

				if (value == 0) {
					error = true;
				}

				usedPoints.push(value);
				item[row][singleColumn] = value;

				if (!error) {
					$('select', tableCellsArray[lastIndex + 1], this).removeClass('something');
					$('select', tableCellsArray[z], this).removeClass('something');
				}
			}
			if (error) {
				alert('Vaata hinded üle');
				return null;
			}


			params.push(item);
		}

		/*if (error) {
			return null;
			alert('Vaata hinded üle');
		}*/

		e.preventDefault();
		var link = document.getElementById('downloadlink');
		var link2 = document.getElementById('fakeBox');
		link.href = makeTextFile(JSON.stringify(params, undefined, 2));
		link.style.display = 'block';
		link2.style.display = 'block';

		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var time = d.getHours() + ":" + d.getMinutes();
		var output = d.getFullYear() + '/' +
			(month<10 ? '0' : '') + month + '/' +
			(day<10 ? '0' : '') + day + ' ' + time;
		$('#downloadlink').prop('download', 'ZyriiVote' + output);


	});

	var textFile = null,
		makeTextFile = function (text) {
			var data = new Blob([text], {type: 'text/plain'});

			// If we are replacing a previously generated file we need to
			// manually revoke the object URL to avoid memory leaks.
			if (textFile !== null) {
				window.URL.revokeObjectURL(textFile);
			}

			textFile = window.URL.createObjectURL(data);

			return textFile;
		};

	$("#newJury").on('click', function () {
		var liige = $.trim($('#juryName').val());
		console.log(liige);
		if (liige.length <= 0) {
			alert('Lisa züriiliikme nimi');
			return null
		} else {
			$('#myTable tr:last').after('<tr><td contenteditable="true" class="juryEdit"> '+document.getElementById("juryName").value +'</td></tr>');

			for (var i=0; i<10; ++i ){
				$('#myTable td:last').after('<td id="' + i + '"><select name="points">\n' +
					'  <option value="0">Vali hinne</option>\n' +
					'  <option value="1">1</option>\n' +
					'  <option value="2">2</option>\n' +
					'  <option value="3">3</option>\n' +
					'  <option value="4">4</option>\n' +
					'  <option value="5">5</option>\n' +
					'  <option value="6">6</option>\n' +
					'  <option value="7">7</option>\n' +
					'  <option value="8">8</option>\n' +
					'  <option value="10">10</option>\n' +
					'  <option value="12">12</option>\n' +
					'</select></td>');
				if (init) {
					$('#myTable th:last').after('<th>Lisa nimi</th>');
					$('#myTable').show();
					$('#myTable th').attr('contenteditable','true');
				}
			}

		}
		init = false;
	})
});
