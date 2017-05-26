import * as _jQuery from 'jquery'

jQuery(($) => {

    const fakeConsole = $('pre');
    let output = '';

    $('#hello-world').click((event) => {
        event.preventDefault();

        doCall('GET', 'hello-world')
    });

    $('#clear').click((event) => {
        event.preventDefault();
        fakeConsoleClear();
    })

    $('#login-form').submit((event) => {
        console.log('login in');
        event.preventDefault();
        const data = {
            user: $('#user').val(),
            password: $('#password').val(),
        }
        doCall('POST', 'login', data);
    })

    function doCall(method:any, url:string, data:any = false) {
        const ajaxSetting:JQueryAjaxSettings = {
            url: url,
            method: method,
            success: writeOuputToConsole,
            dataType: 'text',
            error: writeErrorToConsole
        }

        if (data) {
            ajaxSetting.data= JSON.stringify(data);
            ajaxSetting.contentType = "application/json"
        }

        fakeConsoleWrite(`> ${method} ${url}`);
        if (data) {
            fakeConsoleWrite(`> ${JSON.stringify(data)}`);
        }

        $.ajax(ajaxSetting);
    }

    function writeOuputToConsole(data, status, request) {
        fakeConsoleWrite(`STATUS ${request.status} ${status}`);
        fakeConsoleWrite(request.getAllResponseHeaders());
        if (data) {
            fakeConsoleWrite(data);
        }
        fakeConsoleWrite('');

    }

    function writeErrorToConsole(response) {
        fakeConsoleWrite(`ERROR STATUS ${response.status} ${status}`);
        fakeConsoleWrite(response.getAllResponseHeaders());
        fakeConsoleWrite(response.responseText);
        fakeConsoleWrite('');

    }

    function fakeConsoleClear() {
        output = '';
        fakeConsole.text('');
    }

    function fakeConsoleWrite(line:string) {
        output += `${line} \n`;
        fakeConsole.text(output);
    }

});
