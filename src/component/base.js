import firebase from 'firebase/app'
import database from 'firebase/database'
import fb from 'firebase'

let app = firebase.initializeApp({
   
        apiKey: "AIzaSyA112GlIxcoYmNZvd287XOqHcfsOVj9NiQ",
        authDomain: "thermo-1aa2c.firebaseapp.com",
        databaseURL: "https://thermo-1aa2c.firebaseio.com",
        projectId: "thermo-1aa2c",
        storageBucket: "thermo-1aa2c.appspot.com",
        messagingSenderId: "1006865751773"

});

//export let base = Rebase.createClass(app.database())
export const ref = firebase.database().ref()
export const fbs = firebase.storage().ref('image')
export const products_fbs = firebase.storage().ref('products')
export const MyTeam_fbs = firebase.storage().ref('Team')
export const Asset_fbs = firebase.storage().ref('Assets')
export const visit_fbs = firebase.storage().ref('visit')
export const meeting_fbs = firebase.storage().ref('Meeting')
export const call_fbs = firebase.storage().ref('Call')
export const tixy_fbs = firebase.storage().ref('Tixy')

export const tixyReport_fbs = firebase.storage().ref('TixyReports')

export const Lead_fbs = firebase.storage().ref('Lead')
export const DMS = firebase.storage().ref('DMS')
export const contract = firebase.storage().ref('contract')

export const auth = fb.auth