Unit testing is when an application is broken down into the smallest (isolated) parts possible "units"/ conceptual problems and those units are tested individually to see whether every part of the application works as intended and the returned value is the value expected.

Unit testing can be done manually but it is often automated using tools such as Jasmine, Mocha, Ava, Tape, xUnit.net, NUnit, JUnit, TestNG etc...

A piece of code always starts by being simple but with every line complexity is born. Unit testing helps us not only to test the application but also to understand the application on a deeper level since the application will be broken down into smaller pieces.


For example if you have an object, within the object you have an array of objects.
You have a method within your object which adds ups certain values.

Since the values are hard-coded the total shouldn't change and unit testing will prove that it works as intended or that there's an error.


basic unit test which requires Mocha

const assert = require('assert');

it('should return true', () => {
    assert.equal(true, true);
});