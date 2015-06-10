jQuery(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    $('.btn-file>input:file').on('fileselect', function (event, nfiles, label) {
        console.log("fileselect");
        var input = $(this).parents('.input-group').find(':text');
        console.log(input);
        var log = nfiles > 1 ? nfiles + ' files selected' : label;
        if (input.length) input.val(log);
        else if (log) alert(log);
    });
    $(document).on('change', '.btn-file>input:file', function () {
        var input = $(this);
        var numFiles = input.get(0).files ? input.get(0).files.length : 1;
        var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
});