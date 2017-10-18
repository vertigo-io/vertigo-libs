function completeDataTableQuery(dataColumns, dataQuery) {
	var datas = new Array();
	for(var i = 0; i < dataColumns.length; i++) {
		dataColumns[i].label;
		datas.push(dataColumns[i].data);
	}
	dataQuery.datas = datas.join(";");
}

function showDataTable(elem, datas, dataColumns) {
	elem.html("");
	elem.parent().addClass("p-0");
	var dataTableDatas = toDataTableDatas(datas.timedDataSeries, dataColumns);
	var table = $('<table cellspacing="0"/>').appendTo(elem);
	var columns = $.map(dataColumns , function(column, index){ 
		var renderer;
		var cssClass = 'text-left';
		if (column.format === 'time:second') {
			renderer = timeRendererSeconds;
			cssClass = 'text-right';
		}
		if (column.format === 'number') {
			renderer = $.fn.dataTable.render.number(' ', ',', 0, '');
			cssClass = 'text-right';
		}
		
		return { 
			name:  column.data,
			title: column.label,
			data : column.data,
			className: cssClass,
			render: renderer
			}
	});
	
	table.addClass("table table-striped");
	
	var paging = elem.data("paging");
	
	$(table).dataTable({
		data : dataTableDatas,
		columns : columns,
		paging : paging != null &&  paging != undefined ? paging : true,
		searching: false,
		info: false,
		lengthChange: false,
		pageLength: 10,
		  /* No ordering applied by DataTables during initialisation */
        order: []
	});	
}

var timeRendererSeconds = function ( data, type, row ) {
	if (type == "sort" || type == 'type') {
		return data;
	}
	
	if (data > 1000) {
		return $.fn.dataTable.render.number( ' ', ',', 2, '', 's' ).display(data/1000);
	}
	return $.fn.dataTable.render.number( ' ', ',', 2, '', 'ms' ).display(data);
}


/** Conversion de données servers List<date, Map<NomMetric, value>> en données DataTable.*/
function toDataTableDatas(datas, metrics) {
	var newDatas = new Array();
	for(var i = 0; i < datas.length; i++) {
		var serie = new Object();
		
		for(var j = 0; j < metrics.length; j++) {
			serie[metrics[j].data] = datas[i].values[metrics[j].data];
		}
		newDatas.push(serie);
	}
	return newDatas;
}
