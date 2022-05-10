/**
 * STAFF - CRUD(create-read-update-delete)
 * 1. Break down requirments
 *      + Add staff
 *      + Show staff
 *      + Delete staff
 *      + Update staff
 *      + Find staff
 *      + Validate data
 * 2. Create  display
 * 3. Object classification
 */

let staffList = [];

let createStaff = function () {
    let isFormValidate =  validateInput();
    if(!isFormValidate) return;
    let id = document.getElementById("tknv").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let datePicker = document.getElementById("datepicker").value;
    let salary = +document.getElementById("luongCB").value;
    let position = document.getElementById("chucvu").value;
    let timeWork = +document.getElementById("gioLam").value;
    let newStaff = new Staff(id, name, email, password, datePicker, salary, position, timeWork);
    staffList.push(newStaff);
    renderStaffs();
    saveData();
    resetForm();

};
let findById = function (id) {
    for (let i = 0; i < staffList.length; i++) {
        if (staffList[i].id === id) {
            return i;
        }
    }
    return -1;
}
let deleteStaff = function (id) {
    let index = findById(id);
    if (index === -1) {
        alert("Not find");
        return;
    }
    staffList.splice(index, 1);
    renderStaffs();
    saveData();

};

let getStaff = function (id) {
    let index = findById(id);
    if (index === -1) {
        alert("Not find");
        return;
    }
    console.log(index);
    let foundStaff = staffList[index];

    document.getElementById("tknv").value = foundStaff.id;
    document.getElementById("name").value = foundStaff.name;
    document.getElementById("email").value = foundStaff.email;
    document.getElementById("password").value = foundStaff.password;
    document.getElementById("datepicker").value = foundStaff.datePicker;
    document.getElementById("luongCB").value = foundStaff.salary;
    document.getElementById("chucvu").value = foundStaff.position;
    document.getElementById("gioLam").value = foundStaff.timeWork;

    document.getElementById("btnCapNhat").style.display = "inline-block";
    document.getElementById("btnThemNV").style.display = "none";
    document.getElementById("header-title").innerHTML = "UPDATE INFOMATION";
    document.getElementById("tknv").disabled = true;

};



let updateStaff = function () {
    let id = document.getElementById("tknv").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let datePicker = document.getElementById("datepicker").value;
    let salary = +document.getElementById("luongCB").value;
    let position = document.getElementById("chucvu").value;
    let timeWork = +document.getElementById("gioLam").value;

    let index = findById(id);
    if (index === -1) {
        alert("Not find");
        return;
    }
    let foundStaff = staffList[index];
    foundStaff.name = name,
        foundStaff.email = email,
        foundStaff.password = password,
        foundStaff.datePicker = datePicker,
        foundStaff.salary = salary,
        foundStaff.position = position,
        foundStaff.timeWork = timeWork
    renderStaffs();
    saveData();
    resetForm();
    document.getElementById("btnDong").click();

};

let resetForm = function () {
    document.getElementById("clearForm").click();
    document.getElementById("tknv").disabled = false;
    document.getElementById("btnThemNV").style.display = "inline-block";
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("header-title").innerHTML = "REGISTRATION";
};


let findStaff = function () {
    let keyWord = document.getElementById("searchName").value.toLowerCase();
    let results = [];
    for (let i = 0; i < staffList.length; i++) {
        let ratingStaff = staffList[i].Rating();
        if (ratingStaff.includes(keyWord)) {
            results.push(staffList[i]);
        }
    }
    renderStaffs(results);
}

let renderStaffs = function (data) {
    data = data || staffList;
    let dataHTML = '';
    for (let i = 0; i < data.length; i++) {
        dataHTML += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].email}</td>            
            <td>${data[i].datePicker}</td>            
            <td>${data[i].position}</td>
            <td>${data[i].totalSalary()}</td>
            <td>${data[i].Rating()}</td></td>
            <td><em onclick = "getStaff('${data[i].id}')" data-toggle="modal"
            data-target="#myModal" class=" fa fa-cog "></em><em onclick = "deleteStaff('${data[i].id}')" class="fa fa-trash"></em></td>
            
        </tr>`;
    }
    document.getElementById("tableDanhSach").innerHTML = dataHTML;
};



let saveData = function () {
    let staffListJSON = JSON.stringify(staffList);
    localStorage.setItem("list", staffListJSON);
};
let getData = function () {
    let staffListJSON = localStorage.getItem("list");
    if (staffListJSON) {
        staffList = mapData(JSON.parse(staffListJSON));
        renderStaffs();
    }
};
let mapData = function (dataFromLocal) {
    let data = [];
    for (let i = 0; i < dataFromLocal.length; i++) {
        let currentStaff = dataFromLocal[i];
        const mappedStaff = new Staff(
            currentStaff.id,
            currentStaff.name,
            currentStaff.email,
            currentStaff.password,
            currentStaff.datePicker,
            currentStaff.salary,
            currentStaff.position,
            currentStaff.timeWork
        );
        data.push(mappedStaff);
    };
    return data;
};
getData();

let validateInput = function(){
    let id = document.getElementById("tknv").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value ;
    let datePicker = document.getElementById("datepicker").value;
    let salary = document.getElementById("luongCB").value;
    let position = document.getElementById("chucvu").value;
    if(position ==="0"){
        position = false;
    }
    let timeWork = document.getElementById("gioLam").value;
    let testname = /^[A-z ]+$/g;
    let testEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    let testPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    let testDatePicker = /^(0[1-9]|1[0-2])[\/](0[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/;
    let isValid = true;
    isValid &= require(id,"tbTKNV") && lengthInput(id,"tbTKNV",4,6);
    isValid &= require(name,"tbTen") && pattern(name,"tbTen",testname,"* Employee name must be letter");
    isValid &= require(email,"tbEmail") && pattern(email,"tbEmail",testEmail,"Email is xxx@xxx.xxx");    
    isValid &= require(password,"tbMatKhau") && pattern(password,"tbMatKhau",testPassword,"* Password from 6-10 characters (contains at least 1 numeric character, 1 uppercase character, 1 special character)");
    isValid &= require(datePicker,"tbNgay") && pattern(datePicker,"tbNgay",testDatePicker,"* format mm/dd/yyyy");
    isValid &= require(salary,"tbLuongCB") && valueInput(salary,"tbLuongCB",1000000,20000000,"Salary");
    isValid &= require(position,"tbChucVu");
    isValid &= require(timeWork,"tbGiolam") && valueInput(timeWork,"tbGiolam",80,200,"Time Worker");
    return isValid;
};

// Required
let require = function(val,spanId){
    if(!val){
        document.getElementById(spanId).innerHTML = "* This field is required";
        document.getElementById(spanId).style.display="block";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
};
// Length
let lengthInput = function(val,spanId,min,max){
    if(val.length < min || val.length > max){
        document.getElementById(spanId).innerHTML = `* length must from ${min} to ${max} character.`;
        document.getElementById(spanId).style.display="block";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
};
// Pattern
let pattern = function(val,spanId,regex,message){
    if(!regex.test(val)){
        document.getElementById(spanId).innerHTML = `${message}`;
        document.getElementById(spanId).style.display="block";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
};
let valueInput = function(val,spanId,min,max,message){
    if(val < min || val > max){
        document.getElementById(spanId).innerHTML = `* ${message} must from ${min} to ${max} .`;
        document.getElementById(spanId).style.display="block";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
};


