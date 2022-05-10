function Staff(id,name,email,password,datePicker,salary,position,timeWork){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datePicker = datePicker;
    this.salary = salary;
    this.position = position;
    this.timeWork = timeWork;
    this.totalSalary = function(){
        if(position===1){//Director 
            return this.salary*3;
        }else if(position===2){//manager 
            return (this.salary*2);
        }else {//staff
            return (this.salary);
        }
    };
    this.Rating = function(){
        if(this.timeWork>=192){
            return 'Nhân viên xuất sắc';
        }else if(this.timeWork>=176){
            return 'nhân viên giỏi';
        }else if(this.timeWork>=160){
            return 'nhân viên khá';
        }else{
            return 'nhân viên trung bình';

        }
    };
};