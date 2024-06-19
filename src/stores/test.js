const { doc } = require("firebase/firestore");

const options = [
  {
    label: "team1",
    value: "1",
  },
  {
    label: "team2",
    value: "3",
  },
];

function verify(label) {
  options.forEach((doc) => {
    if (label) {
      console.log(doc.value);
    } else {
      console.log("such a noob");
    }
  });
}
const team = "team1";
console.log(verify(team));
