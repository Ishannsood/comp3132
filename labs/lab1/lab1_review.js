let variablelocal = 200
var variableglobal = 100
variableglobal = "hello"
console.log(variableglobal)

// Prototypes: one time use object created from the base prototype called Object
const newObject = {
    prop1: "Ishan",
    prop2: "comp3123",
    method1: function (param1) {
        console.log(param1)
    }
}

console.log(newObject)
console.log(newObject.prop1)
console.log(newObject.prop2)
newObject.method1("pizza")

// Prototype: constructor
function Student(student_name, course, lunch) {
    this.prop1 = student_name
    this.prop2 = course
    this.prop3 = lunch

    this.method1 = function (param1) {
        console.log(param1)
    }
}

const student_morning = new Student("Ishan", "comp3123", "ice cream")
console.log(student_morning)
console.log(student_morning.prop1)
console.log(student_morning.prop2)
student_morning.method1(student_morning.prop3)

// Optional Homework: Instanttiate another student object and print its value

// Prototypes: Add a method AFTER/IN another file to give more capatabilities to the prototype
Student.prototype.prop4 = "hard-coded value"
Student.prototype.method2 = function (param1) {
    return param1
}

console.log(student_morning.prop4)
console.log(student_morning.method2("noodles"))

// class
class Prof {
    constructor(prof_name_p) {
        this.prf_name = prof_name_p
    }

    method1() {
        return param1
    }

}

const morning_prof = new Prof("Laily")
console.log(morning_prof)

// Optional Homework: call morning_prof's method and directly next print its property