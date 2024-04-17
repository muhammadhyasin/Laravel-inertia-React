    var Ziggy = {
        namedRoutes: {"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"],"domain":null},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"],"domain":null},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"],"domain":null},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"],"domain":null},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"],"domain":null},"profile.edit":{"uri":"profile","methods":["GET","HEAD"],"domain":null},"profile.update":{"uri":"profile","methods":["PATCH"],"domain":null},"profile.destroy":{"uri":"profile","methods":["DELETE"],"domain":null},"expense.list":{"uri":"expenses","methods":["GET","HEAD"],"domain":null},"expense.add":{"uri":"expenses\/add","methods":["GET","HEAD"],"domain":null},"expense.save":{"uri":"expenses\/save","methods":["POST"],"domain":null},"expense.view":{"uri":"expenses\/view\/{expense}","methods":["GET","HEAD"],"domain":null},"expense.update":{"uri":"expense\/update","methods":["POST"],"domain":null},"expense.delete":{"uri":"expenses\/delete\/{expense}","methods":["GET","HEAD"],"domain":null},"expenses.byCategory":{"uri":"expenses\/category\/{category}","methods":["GET","HEAD"],"domain":null},"index":{"uri":"index","methods":["GET","HEAD"],"domain":null},"register":{"uri":"register","methods":["GET","HEAD"],"domain":null},"login":{"uri":"login","methods":["GET","HEAD"],"domain":null},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"],"domain":null},"password.email":{"uri":"forgot-password","methods":["POST"],"domain":null},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"domain":null},"password.store":{"uri":"reset-password","methods":["POST"],"domain":null},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"],"domain":null},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"domain":null},"verification.send":{"uri":"email\/verification-notification","methods":["POST"],"domain":null},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"],"domain":null},"password.update":{"uri":"password","methods":["PUT"],"domain":null},"logout":{"uri":"logout","methods":["POST"],"domain":null}},
        baseUrl: 'http://localhost/',
        baseProtocol: 'http',
        baseDomain: 'localhost',
        basePort: false,
        defaultParameters: []
    };

    if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
        for (var name in window.Ziggy.namedRoutes) {
            Ziggy.namedRoutes[name] = window.Ziggy.namedRoutes[name];
        }
    }

    export {
        Ziggy
    }
