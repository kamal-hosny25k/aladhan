let cities = [
  {
    arabicName: "القاهرة",
    name: "cairo",
    country: "EG",
  },
  {
    arabicName: "القدس",
    name: "Jerusalem",
    country: "IL",
  },
  {
    arabicName: "مكة المكرمة",
    name: "Makkah",
    country: "SA",
  },
  {
    arabicName: "أبو ظبي",
    name: "Abu Dhabi",
    country: "AE",
  },
  {
    arabicName: "بغداد",
    name: "Baghdad",
    country: "IQ",
  },
  {
    arabicName: "الرباط",
    name: "Rabat",
    country: "MA",
  },
  {
    arabicName: "عمّان",
    name: "Oman",
    country: "OM",
  },
  {
    arabicName: "دمشق",
    name: "Damascus",
    country: "SY",
  },
  {
    arabicName: "طرابلس",
    name: "Tripoli",
    country: "LY",
  },
  {
    arabicName: "تونس",
    name: "Tunisia",
    country: "TN",
  },
  {
    arabicName: "الدوحة",
    name: "Doha",
    country: "QA",
  },
];

for (let city of cities) {
  let contant = `
    <option>${city.arabicName}</option>
    `;
  document.getElementById("select-city").innerHTML += contant;
}

document.getElementById("select-city").addEventListener("change", function () {
  console.log(this.value);
  document.getElementById("name-city").innerHTML = this.value;

  let cityName = "";
  for (let city of cities) {
    if (city.arabicName == this.value) {
      cityName = city.name;
      countryName = city.country;
    }
  }
  getPrayersTimingsOfCity(cityName, countryName);
});

function getPrayersTimingsOfCity(cityName, countryName) {
  let params = {
    country: countryName,
    city: cityName,
  };

  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      // handle success
      //! time
      let day = response.data.data.date.hijri.weekday.ar;
      let date = response.data.data.date.readable;
      document.getElementById("to-day").innerHTML = `${day} - ${date}`;
      //!
      // ! timings
      let timings = response.data.data.timings;
      AladhanTime("fajrId", timings.Fajr);
      AladhanTime("sunriseId", timings.Sunrise);
      AladhanTime("dhuhrId", timings.Dhuhr);
      AladhanTime("asrId", timings.Asr);
      AladhanTime("maghribId", timings.Maghrib);
      AladhanTime("ishaId", timings.Isha);
      // !
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

getPrayersTimingsOfCity("cairo", "EG");

function AladhanTime(id, prayer) {
  document.getElementById(id).innerHTML = prayer;
}
