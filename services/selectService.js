const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Hospital = require("../models/hospitalModel");



exports.select = asyncHandler(async (req, res, next) => {
    //0. user latitude , longitude
    const userLat = req.body.latitude
    const userLong = req.body.longitude
    //1. get hospitals Private or Governmental >>> قطاع خاص ..قطاع عام .. قطاع خاص او عام   
    let section = req.body.section
    let hospitals
    if (!section) { hospitals = await Hospital.find() }
    switch (section) {
        case "حكومي":
            hospitals = await Hospital.find({ type: 'Governmental' })
            break;
        case "خاص":
            hospitals = await Hospital.find({ type: 'Private' })
            break;
        case "خاص أو حكومي":
            hospitals = await Hospital.find()
            break;
        default:
            break
    }
    //2. get from 1 hospitals treate user's case

    let oneCase = req.body.case;
    // console.log(oneCase);
    let filteredHospitals
    if (oneCase != 'يصعب التشخيص' && oneCase != undefined) {
        let query = { cases: new RegExp(oneCase, 'i') };
        filteredHospitals = hospitals.filter(hospital => query.cases.test(hospital.cases));
    }
    else {
        filteredHospitals = hospitals
    }

    //3. for loop in the hospitals from 2 and calculate distance/duration between them and user location and save location in its hospital and if hospital.currentbed >0 save it in list1 else save it in list 2
    function calculateDistance(userLat, userLng, hospitalLat, hospitalLng) {
        const earthRadius = 6371; // Radius of the Earth in kilometers

        // Convert latitude and longitude from degrees to radians
        const userLatRad = toRadians(userLat);
        const userLngRad = toRadians(userLng);
        const hospitalLatRad = toRadians(hospitalLat);
        const hospitalLngRad = toRadians(hospitalLng);

        // Calculate the differences between user and hospital coordinates
        const deltaLat = hospitalLatRad - userLatRad;
        const deltaLng = hospitalLngRad - userLngRad;

        // Haversine formula to calculate distance
        const a = Math.sin(deltaLat / 2) ** 2 +
            Math.cos(userLatRad) * Math.cos(hospitalLatRad) *
            Math.sin(deltaLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distance in kilometers
        const distance = earthRadius * c;

        return distance;
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    let listAvailableHospital = []
    let listNotAvailableHospital = []
    // for each to calculate distance for each hospital
    filteredHospitals.forEach((hos) => {
        const distance = calculateDistance(userLat, userLong, hos.latitude, hos.longitude)
        let typee
        if (hos.type == 'Governmental') typee = 'حكومية'
        else { typee = 'خاصة' }
        if (hos.currentBeds > 0) {
            listAvailableHospital.push({ hospital_name: hos.name, phone: hos.phone, address: hos.address, distance, type: typee })
        }
        else if (hos.currentBeds == 0) {
            listNotAvailableHospital.push({ hospital_name: hos.name, phone: hos.phone, address: hos.address, availabilityTime: hos.availabilityTime, distance, type: typee })
        }
    })


    //4. list 1 has hospital.currentbed >0   get the smallest 3 hospital distance of it (get from them name,phone,address,duration,distance)
    //sort list 1 and get data
    listAvailableHospital.sort((a, b) => a.distance - b.distance)
    const smallestDistancesAvailable = listAvailableHospital.slice(0, 3);
    const list1WithoutDistance = smallestDistancesAvailable.map(({ distance, ...rest }) => rest);
    //5. list 2 has hospital.currentuser =0   get the smallest 2 hospital distance  and predicttime < duration  of it  (get from them name,phone,address,duration,distance,predicttime)
    //sort list 2 and get data
    listNotAvailableHospital.sort((a, b) => a.distance - b.distance)
    const smallestDistancesNotAvailable = listNotAvailableHospital.slice(0, 2);
    const list2WithoutDistance = smallestDistancesNotAvailable.map(({ distance, ...rest }) => rest);




    res.status(200).json({ list1: list1WithoutDistance, list2: list2WithoutDistance })

})
