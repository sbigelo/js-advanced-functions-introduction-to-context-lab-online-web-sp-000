function createEmployeeRecord(employeRecord) {
 
    const employeeInfo = {
        firstName: employeRecord[0],
        familyName: employeRecord[1],
        title: employeRecord[2],
        payPerHour: employeRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeInfo
}

function createEmployeeRecords(array) {
  return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, employeetimeIn) {
    const employeeTimeIn = {
        type: "TimeIn",
        hour: parseInt(employeetimeIn.split(' ')[1]),
        date: employeetimeIn.split(' ')[0]
    }
    employeeRecord.timeInEvents.push(employeeTimeIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, employeetimeOut) {
    const employeeTimeOut = {
        type: "TimeOut",
        hour: parseInt(employeetimeOut.split(' ')[1]),
        date: employeetimeOut.split(' ')[0]
    }
    employeeRecord.timeOutEvents.push(employeeTimeOut)
    return employeeRecord
}


function hoursWorkedOnDate(employeeRecord, employeeworked) {
    let clockin = employeeRecord.timeInEvents.filter(x => {
        return x.date === employeeworked
    })
    let clockout = employeeRecord.timeOutEvents.filter(x => {
        return x.date === employeeworked
    })
    let workHours = clockout[0].hour - clockin[0].hour
    return workHours / 100
}

function wagesEarnedOnDate(employeeRecord, employeeEarned) {
    let pay = hoursWorkedOnDate(employeeRecord, employeeEarned) * employeeRecord.payPerHour
    return parseInt(pay)
}

function allWagesFor(employeeRecord) {
    let viabledays = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })
    
    let payable = viabledays.reduce(function(memo, i){
        return memo + wagesEarnedOnDate(employeeRecord, i)}, 0)
        return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(e) {
       return e.firstName === firstName
    })
}

function calculatePayroll(array) {
    return array.reduce(function(e, i){
        return e + allWagesFor(i)}, 0)
}