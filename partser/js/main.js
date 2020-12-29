$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

var file = document.getElementById('docpicker')
file.addEventListener('change', importFile);
var imagebk = document.getElementById('imgpicker')
imagebk.onchange = function(event) {
    var files = event.target.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onloadend = function() {
            $('#horariospartidos').css('background-image', 'url("' + fr.result + '")');
        }
        fr.readAsDataURL(files[0]);
    }
}

var imagebanner = document.getElementById('bannerpicker')
imagebanner.onchange = function(event) {
    console.log("changebanner")
    var files = event.target.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onloadend = function() {
            $('#imgbanner').attr("src", fr.result);
            document.getElementById('imgbanner').src = fr.result;
        }
        fr.readAsDataURL(files[0]);
        console.log(fr.result)
    }
}

function cssChange() {
    var title = document.getElementById('title');
    title.addEventListener('change', cssChange);
    title = title.value;
    if (title != "") document.getElementById('horariostitle').textContent = title;
    var textColor = document.getElementById('textColor');
    textColor.addEventListener('change', cssChange);
    textColor = textColor.value;
    changeColor('font-color', textColor);
    var row1Color = document.getElementById('row1Color');
    row1Color.addEventListener('change', cssChange);
    row1Color = row1Color.value;
    changeBGColor('info_partidoA', row1Color);
    var row2Color = document.getElementById('row2Color');
    row2Color.addEventListener('change', cssChange);
    row2Color = row2Color.value;
    changeBGColor('info_partidoB', row2Color);
    var opacity = document.getElementById('opacity');
    opacity.addEventListener('change', cssChange);
    opacity = opacity.value;
    changeOpacity('info_partidoA', opacity);
    changeOpacity('info_partidoB', opacity);

}

function changeOpacity(classname, opacity) {
    var cols = document.getElementsByClassName(classname);
    for (i = 0; i < cols.length; i++) {
        cols[i].style.opacity = opacity;
    }
}

function changeBGColor(classname, color) {
    var cols = document.getElementsByClassName(classname);
    for (i = 0; i < cols.length; i++) {
        cols[i].style.backgroundColor = color;
    }
}

function changeColor(classname, color) {
    var cols = document.getElementsByClassName(classname);
    for (i = 0; i < cols.length; i++) {
        cols[i].style.color = color;
    }
}

function importFile(evt) {
    document.getElementById('horariospartidos').innerHTML = "";
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = e => {
            var contents = processExcel(e.target.result);
            var partidos = []
            if (contents['Hoja1']) {
                contents['Hoja1'].filter(function(el) {
                    partido = []
                    el.filter(function(el2) {
                        if (el2.toString().normalize() != "") partido.push(el2)

                    });
                    if (partido.length > 0) partidos.push(partido)
                });
                writeInHTML(partidos)
            } else {
                var workbook = XLSX.read(e.target.result, {
                    type: 'binary'
                });
                var strings = workbook.Strings;
                var i = 0
                for (i = 8; i < strings.length; i += 6) {
                    console.log(i + " " + strings[i + 5].t)
                    $('#horariospartidos').append('<div class="categoria font-color">' +
                        '<div class="titulocategoria font-color">' +
                        '<p class="titulocategoria font-color">' +
                        strings[i].t + '</p>' +
                        '</div>' +
                        '<p id="partido" class="p-partido local font-color">' + strings[i + 1].t + '</p>' +
                        '<p id="partido" class="p-partido fecha font-color">' + strings[i + 2].t + '</p>' +
                        '<p id="partido" class="p-partido lugar font-color">' + strings[i + 3].t + '</p>' +
                        '<p id="partido" class="p-partido visitante font-color">' + strings[i + 5].t + '</p>' +
                        '</div>');
                }
                cssChange();
            }
        }
        r.readAsBinaryString(f);
    } else {
        console.log("Failed to load file");
    }
}

function processExcel(data) {
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var data = to_json(workbook);
    console.log(workbook)
    return data
};

function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1
        });
        if (roa.length) result[sheetName] = roa;
    });
    return result; //JSON.stringify(result, 2, 2);
};

function writeInHTML(partidos) {
    var i = 0;
    var back = 0;
    var info_partido = "info_partidoA";
    for (i = 4; i < partidos.length; i += 2) {
        if (back % 2 == 0) {
            info_partido = "info_partidoA";
        } else {
            info_partido = "info_partidoB";
        }
        back++;
        $('#horariospartidos').append('<div class="categoria ' + info_partido + ' font-color">' +
            '<div class="titulocategoria">' +
            '<p class="titulocategoria font-color">' +
            partidos[i][0] + '</p>' +
            '</div>' +
            '<div class="row"><p id="partido" class="p-partido local col-3 font-color">' + partidos[i][1] + '</p>' +
            '<p id="partido" class="p-partido visitante col-3 font-color">' + partidos[i + 1][0] + '</p>' +
            '<p id="partido" class="p-partido fecha col-2 font-color">' + partidos[i][2] + '</p>' +
            '<p id="partido" class="p-partido fecha col-2 font-color">' + partidos[i + 1][1] + '</p>' +
            '<p id="partido" class="p-partido pabellon col-2 font-color">' + partidos[i][3] + '</p></div>' +

            '</div>');
    }
    cssChange();
}

$('#printJPG').click(function() {

    var w = document.getElementById("horariosFull").offsetWidth;
    var h = document.getElementById("horariosFull").offsetHeight;
    html2canvas(document.getElementById("horariosFull"), {
        allowTaint: true,
        foreignObjectRendering: true,
        imageSmoothingEnabled: false,
        mozImageSmoothingEnabled: false,
        oImageSmoothingEnabled: false,
        webkitImageSmoothingEnabled: false,
        msImageSmoothingEnabled: false,
        dpi: 300,
        scale: 2,
        onrendered: function(canvas) {
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg", 1).replace("image/jpeg", "image/octet-stream");
            a.download = 'horarios.jpg';
            a.click();
        }
    });
});

$('#printPDF').click(function() {

    var element = document.getElementById("horariosFull");
    element.classList.add("fixed-width");

    var HTML_Width = $("#horariosFull").width() * 3;
    var HTML_Height = $("#horariosFull").height() * 3;
    var top_left_margin = 15;
    if (HTML_Width >= HTML_Height) {
        var PDF_Width = HTML_Width + (top_left_margin * 2);
        var PDF_Height = (PDF_Width) + (top_left_margin * 2);
    } else {
        var PDF_Width = HTML_Width + (top_left_margin * 2);
        var PDF_Height = (HTML_Height) + (top_left_margin * 2);
    }
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    html2canvas(document.getElementById("horariosFull"), {
        orientation: "landscape",
        allowTaint: true,
        foreignObjectRendering: true,
        dpi: 300,
        scale: 1,
        quality: 4,
        onrendered: function(canvas) {
            var imgData = canvas.toDataURL('image/png', 1.0);
            var doc = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
            doc.addImage(imgData, 'PNG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
            doc.save('horarios.pdf');
            element.classList.remove("fixed-width");
        }
    });

});