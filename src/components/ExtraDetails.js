import React, { useState } from 'react';
import './style1.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ExtraDetails = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [mnumber, setMnumber] = useState('')
    const [showErrNum, setShowErrNum] = useState(false)
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')

    const [state, setState] = useState('')
    const [showErrState, setShowErrState] = useState(false)

    const [pincode, setPincode] = useState('')
    const [showErrPin, setShowErrPin] = useState(false)
    const [showErrEmail, setShowErrEmail] = useState(false)
    const [showErrCity, setShowErrCity] = useState(false)
    const [showErrDob, setShowErrDob] = useState(false)
    const [showErrfname, setshowErrFname] = useState(false)
    const [showErrLname, setshowErrLname] = useState(false)
    const [course, setCourse] = useState('')

    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        const temail = e.target.value
        const valid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(temail)

        if (valid) {

            setShowErrEmail(false)
            setEmail(temail)
        } else {
            setShowErrEmail(true)
            setEmail(temail)

        }
        if (temail.length === 0) {
            setShowErrEmail(false)
        }
        console.log(valid)
    }

    const handleNumChange = (e) => {
        const num = e.target.value
        const numisValid = /^[1-9][0-9]{9}$/.test(num)
        const onlyNumber = /^[0-9]*$/.test(num)
        console.log(numisValid)
        if (!numisValid && !onlyNumber) {
            setShowErrNum(true)
        } else if (onlyNumber && num.length <= 10 && num[0] !== '0') {
            setShowErrNum(false)
            setMnumber(num)
        }

    }
    const handlePinChange = (e) => {
        const num = e.target.value
        const isValid = /^[0-9]{0,6}$/.test(num)
        if (num.length < 6 && isValid) {
            setPincode(num)
            setShowErrPin(true)
        } else if (num.length == 6) {
            setShowErrPin(false)
            setPincode(num)
        }
        if (num.length === 0) {
            setShowErrPin(false)
        }
    }
    const handleNameChange = (e) => {
        const name = e.target.value
        const valid = /^[a-zA-Z ]{0,30}$/.test(name)
        if (valid) {
            setshowErrFname(false)
            setFname(name)
        } else {
            setshowErrFname(true)

        }
        console.log(valid)
    }
    const handleLnameChange = (e) => {
        const lname = e.target.value
        const valid = /^[a-zA-Z ]{0,30}$/.test(lname)
        if (valid) {
            setshowErrLname(false)
            setLname(lname)
        } else {
            setshowErrLname(true)
        }
        console.log(valid)
    }
    const handleCityChange = (e) => {
        const city = e.target.value
        const valid = /^[a-zA-Z ]{0,30}$/.test(city)
        if (valid) {
            setCity(city)
        } else {

        }
        console.log(valid)
    }
    const handleStateChange = (e) => {
        const state = e.target.value
        const valid = /^[a-zA-Z ]{0,100}$/.test(state)
        if (valid) {
            setShowErrState(false)
            setState(state)
        } else {
            setShowErrState(true)
        }
        console.log(valid)
    }
    function calculateAge(dob) {
        const dobDate = new Date(dob);
        const currentDate = new Date();

        const age = currentDate.getFullYear() - dobDate.getFullYear();

        // Check if the birthdate has occurred this year, but not yet this month and day
        if (
            currentDate.getMonth() < dobDate.getMonth() ||
            (currentDate.getMonth() === dobDate.getMonth() &&
                currentDate.getDate() < dobDate.getDate())
        ) {
            age--;
        }

        return age;
    }
    const handleDobChange = (e) => {
        let dob = e.target.value
        console.log(dob)
        console.log(calculateAge(dob))
        const tage = calculateAge(dob)
        if (tage < 2 || tage > 120) {
            setShowErrDob(true)
        }
        else {
            setShowErrDob(false)
            setDob(dob)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("clicked");
        const data = {
            studentName: fname + " " + lname,
            phoneNumber: mnumber,
            age: calculateAge(dob),
            email: email,
            city: city,
            state: state,
            pinCode: pincode,
            dateOfBirth: dob,
            address: address,
            course: course
        }
        console.log(data);

        axios.post(
            "https://fiery-advice-production.up.railway.app/student", data).then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Student Registered',
                });
                navigate('/students');
            }).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: e.message,
                });
            })

    };
    return (
        <div>
            <Navbar />
            <div className="container card m-3 mx-auto p-5 rounded mt-5 w-75">


                <form onSubmit={handleSubmit} id="form1">
                    <div className='row'>
                        <div className='col col-lg-6 col-md-6 col-12 d-flex align-items-center flex-column'>
                            <h1>Create Student</h1>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAB8lBMVEX/////6tz/K0oAAAAjHyD+sKMAYfobGxv/8uTw8PDk5OSQhXxRUVGMjIz/+utiYmJycnJERERQSkcAUflnZ2cAX/oAU/mVlZXJyckdGBmnp6cAWPkAW/mFhYX39/cATvkzLzC0tLQ/Pz//9Pb/BDjU1NT/uKoUDhD/JUb/G0D/9+6+vr6fn5+urq670v04ODj/ADD/vrAASPmswPxskvsAHhslJSVWVlZ7cGn9pJv/89mmu/y5zP3/tpm/1f3/JzsibPplEBxdifrcJkHq3dCqpJp4bWbFj4Tkopb9l4aEoPuKX1iPqfs4dvoAOJHS4f7/P1v/4+b/p7BMfvr/ucGDpfvgBiP/XnXyK0n/j5tWDhj/yM8tJSDMxrm7tKlpXlhSODOXaGD+m5jKlYpoR0L+dXr+zcWgbWVBKyewmI/8gGzHZ1Xd0cRtNi0xRHgAOKQALHMASr4AJHiPn87jqqqqkciVqOvWqr5QWWthdeWAf910U04ACSsAVNsAABcACVEgRpAAADYjEwBEaNmbQ6aLN0A/WFUcIVfdMFsAK3NjVM3MNnEARLDHrtaQFyetQJUzR9uJTbfAPIKsVVZVednKzuCjRJ8AIpsAO753MLC5eqT+W2nsp7qgWpX/ABkxUa3eABZWRdntXH2uJjrVM2TCJz/FWsT3AAAT/0lEQVR4nO2di18bV3bHhcYahAAhMcwgmIERWBoEEgI9CjaShZbFEcFShMH4ET/AxgR76252m8Ru7NJuE2/jOmkSd5vubunD3W3+z547L81IM2JeAuLO7/OJAQWN7pdzzj3nnns18nhcuXLlypUrV65cuXLlypUrV65cuXLlypUrV65cuXLl6hQ03uOcTptFS7MLmJMKR04bqFl9jvIhjZ02klpDjgNi2OhpQykV7wAghp02lVJj6E8eDziheEomnDhtLIXC2ICDV5NietjBa9rVZNTRy4nTcr+jF7WnaNzRy0XOHuGcw9c7e4RORiFSt0t44nrXCP0zzY+8Y4T+ri6/CBkQ59B3i3CmixdA9kRhGEn02LtF2CUpeIcfR8DzjhH6ZcK7QtZCq5x3iXBGBuy6JxDuBGc8iw6/yikSKgC7VgXCy/6u4KDDL3OKhH4Fob8XDWMEHnqHCJWAAHZvMNqLHnp3CGe6mhQM8szNhBN2x3ZqhM2AMqiaMDCWtLk8Py1Cv0HCiciEzV5gN7bgDOHs0EB/3BNfnAxPJo//7RYf1SYc8ESSA6GUraZuNzYbD9sn7IkCVqB/km9Mpo5N2vqAasKJ0AQWCoewOLYYsDo05KVJ24TjwsJ8YjjMf40c14HV9dFmLw1EPIFAPD4aGE1ZHRsinLBNGB5H/473eQJCRTLU3q/aAHYmW9gmjAi9umFY/wzz80LPwmSfvlu18VElYXIoZF2NCdgRQrGUDMv/9PXBf7o9s3YmVBDa2mwYkr9zhFCcWeak74fjKbDggs5vtwVUEo7bGJKzhMlZ4StPOAxsk55ZmFpntbNGWx89o4TDYsj1I79EHjvH0/Vou1l7wGbCiSlh0ho32ZZ3lnBS+mZuNjKGRtI/0Yd+XIhHNHT37l0ThOGAsDE2ljJXvDlL2CirkqPC9DIbEH5q1WUkE4R9cYGwL2KH0H7GN67204yGDZNJ/i/YN2tuO0NJOBrpOznCYwGbCVN9ntlQcrhnYMDTY8aKSkKHKm9Pz7CmUsoZ8XhANeFociwaSWKh7oXFMU8qFbVG6NDqqcfABvMxiaKVcBwCejQVCHh6ArNzw6lkeHFxzpi3doAwpUvYSIsGADuTDx0hTOoSygWqAR/tUNXmTBwO6wDK84MRH1USDi8OWFeoA4THyRjgT7nXZshHf8qEBgF/uoQGfbRjhKhcToVSdqbnY2QUsFOEvTPj/NeOncU06qOdIwzu8F/DDl9dkmEfbSIcN9B6PU4SYUuF5aRMAKoJQyH7h1+bCIMtRyOckHEfbe55x2dtv3g3lowgQn7/Drvgl49GOCgzgGrC0cXxuci45XY3L2EF3Ov3o0Ac5MfiNKEZH20iDGApbBLDRu2cnRS6GL3+ruCTe0+C6CUct6EpE6oJ4x6hHWInjcmEspwmNAfYqa6+itDZFzDno0rCiXCfZYUbGzmthF3OEpoE7FRXv3OEJn20M2v8aAcJzfpoRwgjE1jH4tA8YCcIU5FwxwiVlz09QiHjd4RQvmpw9fLjy6tmO1FA2LNosTBtN9M4lw5lH10dlGpCU4Se8THL71g6GUIZUCzrr2RM9byHhxfj3VbfdnYihNI1g3Mioc+nQgz6tYBlwokw6m7HLS5ZT4JQ9lH+7Oju/QrHcTcfBOVX8g+qk5SaMD4nLn4tHjc9AUIZUFh67nE+7iH3YD7xQHr8Mjy6qkcYklcTFmdUFWEopSQ0X3jHNddv8hXBhA/XKms+n+/iA24/lvhIfBwdfNazYU/DcqPW3galJJzox+wQjkcxrbfTNRLFYDe29pBDgLF5H7cvh6L/3ntPWgEFwlAUKIW2WGQhbEWNCUrsYigITXoFekMk1tJraBQz93rBRe/zhImjDOe72IDRnFkRIdqpC2HCQAKWj3vpEpq8AD9RtkzpjQFPgpferxwgRG7v4SOf7yMtLjXhmNTaRMlwSONFbRGaLbz7VftLohqXu3z3AiYHIkD6uMfB4wjFzda+ZAj1/ux2OG0TovehNpuw4aPBqGdKGG/F9/77F32+tRfYzr1VfzCol/yBcEy5NRew+/4L+4SenubIbQD6LzwR3yuCHXDv/wL0l8JP0Z3eu12axgwOjmMq2e3D245DDTUu9uSC+HYfDHvBXUSEv/irxtjf0yQcUG+1ho5/vRMnbFxrNerZkUb6KANh+D5IOXzNjO+sCVsJbZc0so/6n8wFdxpD5XzCXHOgHP/SUtdSW0LbJuwAoVxw94b8dxRj9YnKPJIeOffLj7+slaoBFSO/EJma2nvhkAmdJxSv5F8dvHtZZY01CXGN//FXv8bzVYakilm2pmD0o+RSyaxxmfvOmNBxQtFHg5ffu6eOJ0gXorgr2F9/UsNJcmWdIckihbPFclxmRL+65/M94jLIipnMmSOUDPi4acKAdCER+j6lyHyexHnCWoHGmSLBri8tySaEzOKDUpbj/ypnjVB469LlnQvNfLDC5yTCz2hyq8rgZB4I4RtypcrQBfLpkmTCg8wjzlepcBWYfz9ynNDergXvo8Gdx3OtgNjDjAh4qUySZTAdGBJs+JSmc2WcSBN02b8kmtC3tstldsGQPt/BpKWlxWTj7EULoZ0WngA4+ESDD8NGRMJLn9E4OCaFM+srJO+hJRb9TBfKeaGjs5vxVYASGf3ieYtDaT71pSC0Acj7aHBntSUEBXGXeD0jSByniwROV7dInEqXn+Zh0tlmAJT5GP3eo48ecdxDmJB8HSG009PnL3K3V9uEf0NR5c+fP/+cKTE4jrwSB6MBK1WsUjg4KlnO0bhowrUXnO8Fx505QsFHozM7Gnx/e1gtbbMkEpo9eUIqhyNRDP8jXajhHwi/DOZb417w+fPi1bNEyD/9Sa9fA3C4RjBsvo6TovkEQohFHNIijqKRIkoELv72FY7blaYlq3NpJ+KQv4S/V14uNfR3h2SxyJIMUa+RCA7ACIhDHpVeKaPMuM3gReoD6Qkwhe5J5cHZIRSKmeBO8HEz4N/XtyiqVi8zeLaOPBKZjoZ/KCBk8oU6icKQgRpAfgYfhgKh1UB0nlCq1gaDzcn+K6jKqgTJ1rcAD+yHTMfnQxymFraehW9RGObwDxrPWfPJ5YHFQNQntJrwxQsEJ2fea5pjINbY7QIBBkQTJ8kTMusoQ4jlTJGC4hQsq3jSfRnQZ7EwdZxQXjLdmWmy4SE/uxSgDqVLBBRqsJpAkwwDyaJGEmkaam8CHqWLv1E+SyZcwx3oeTtAqFj1CndHkPUPKP7AiiWEhaOkh5I9VSL4GYdJU5A92OIhJJEvlE9bk+ofMC7/Crc39482No72Nw16rdOEXQqpV00fs/U8y5BZQGJQDcMTMtUVVM1ADtwiwWHZ9PeHyijEpIXIpc8pnNzyXN08is1PTyeQYvM3DM09DhOqOoOrqqH+wLDVUjVfByT6aQ0RUmmWqrN8hmCgIoXQhBrgA1z1LOzLS8D3jGFI/PCld3464W0oEfvtPx5feTfOiTURWlpaqM8jqBstTB2nqJU8zhcuNFmrMlR6qw5pnijRbAmlx1IWAvLXX6kAf0UC4HPIKm9ezS97mzV9zczoHCBsPnChTPn/hBOQDaFWg+KlDOsH5Kg0zKE4WcsR+SqNijjw4Nev1CY8pD79tMy8/loDD2n+tg1CCzNXc/da2WD7hsSzuRxBMQyB1yl+wmFwBoDZOs2Cr6Lpp/bPr5a/VZsQZ1aY75aXE5p8CNFEHdBMaB6w9cyMosV2iErrrVKxWi2iFWF+m6HX0dzKrG/T63n4ji59/2re61WbkPfOaT085Kf7lgmtFN6tOxD+qDRWlAxxksC3thgAxOssW8rzVVud5etT8vmf5sFSahN+BeZrg2fSiA4Qahx8Eo8cYws4LTCiFQSxVSeo7W0oY6C+QbUNix9+jfimm0x4U9c7ZcU2T5JQ63Sef5UvbX5Zz5UJgmZomiBqxVyWKuSyEH1UARwUJtN/QXzexP7vVIA/O5YPnnPDKqGlwlvz9Jrff+/CFx+ztVy6mCsUcsV0gdpKp/8VWY/OQ5mK4wKfNwG1p4rw5wYIvTdPlFDviKU/uM6SNEGXazWcJrKlKp39BlbBzBYkevw7cSoBQN+eWROCrBJaK9rGtQm7lnLpGkEQFM2gtFCm2OoPFMnU6ln83yQ+L1o+3DFtwpMm1DPiEoEX0kVw0zxFsiVmvb7++0N6q86+lObK6SO0iDiwYMKTJtQ760yAdxIUVc7D8reWy7P4N3/Il/4o8iWmNx7wBxjMRyH8bU6aUPuobJzlu2mQLKAyIyFxHP7+k2s31XzSXhSvO4ZNaDwhOkSobcQfCJEwW1xBeZH5/t83YvwAl5ePLkqrXK6yi8bw6ErFl9kzaEJvzHD17RShphH5diEqaep5Gr6y+f+YF/lefn7J1xCHlOF8mbU1A9lecIENa4Q29mU0JpulpxRNEdRWscgwOEmVS9U/Ig9dTrzBSVxJyFNmfJXd+76L7cpRlZsabVE1EVrfl9Ew4lKxWsil01USVupEGTjZ/5z2zt98g9ZS1Joa8ODF7pUK2PHIoA2907esEVoG1DLi0vZWDaegaKOIfKmIZ/FPrv7Xq2cMX6kSn6oJ13yZDARkxSCfieVFUxzaIGw14lKNosBLy+vF9DqVLad/+O9PXqM9GNSZqn/WRFg5ePiwwvmMOqmeDXtGU03HCJ0jbDXiUg7Vo+nCCkMQeDp3+AecxlFLCixYx79UBSJ3UFkDGz4wDKgTh0NjkUCyT/XeWgcJW4y4VCujjE/D+r6Yxim0CUNV0QY+U4fl1KUmG17ZfbG3bzQKdRYXYeEwb7/SjM7FYasRlxgAgcobgrBMoC0mnMrnCJwp1ylgfaYm3OMymX3jJtTMh2PSeeIBxTEcJwlbjJhlynkoTPM0JayDs9Uci9MrqD+DM89lI8IUurZXOfhtwjigN6bRjOppNElDEdlTnSRsMWKxWFgvE2gLlN8KhcRP4Gy1mBUKnUtCsl+rvHhkpiLVt+GYfOA8gE1MzPU0Efr9/uCMzcM0TauoQBbWTaSABwFZKEHiZ9PbQrFK0mg25e7LNemHKLqUVkzE0OpKR1pTaeOsLbp/lvRBGc7eF0NtxIBYliIc6mlpC1Ya5XqNFjZ+cbJ8KVNpXlRcvy4RzMduXLv+9roeocbyKS6fCB+NoNPh4u15Hb7zhyYhFKa50hZL4tlqiT+IQZRRh4r5bFcB+KEwbgSViM1v3EJx9vat/tzami1S8vsWxsZ7UFd/sROEMy2EJM2upIs14KPKdVgh4jRdKOWK23TTXowUhW/fvt2/Ji6N2pmwNRAb80wqzt/Hjr/xn/hROs59VpDKiOCWbDlXqsJcSlJMsQhzDsk+LdVYOlv6H3WP9ENp5DdeNC7WjrA1EBXnGBd5uBR6q/SicP3u8KSsBVu3olAacSlbBnOVWdSlYXKlMuR8qlZfAXOS5J/mMU0Ter2Kd6u3cVJvwmhdes5hG4pHMtC8PBMs5cBckPrYcjHN5/xsoYh48ZfzCR0TKvuE59/qA5pdW3ToHkN5RIUWFjmcn2HK9RUUmq9RI0PPhIoAa0toeP+po4R1WFpsFUvrBMoQDFtIQyDS5NdoGaxrQkCUnn61DaHZNb6DhMpPn5zJF0tVnEB+SbJ5ZEASL2b4ceuaUOF/V+cdcFLnCVUfz9hXJviihmS36lUW8vybzWubb6/f/HMbEzb6aFdjZ5JwYORcQ1/8Bq0ogK9UQKhvbi5PT6PC7MdJfRM2lu+32xAa35rpLOG5L76C5W6+VKAgEl8mpF3BxH6mckfXhHK90o7QeEu4U14qcXYvf/fsKYW/fvm/ij35BN8lHdExoWzEtoQme20OEoofHzkkInajKnN5WXXkIMHvVsjvnmkxoRSJ19ra0OgeaaeyRUgm1BjcA7k7o2lCaR5pS2g4XThvwzivASOEPs53RXungo+yzbZr/sRpETbHYVtCtMb/2Y8av8JXLGeUUD2XahKKcShIu4HIu+mtdoSn56USIXyZ0iH0TjcAMxs664fjCE+v8hYJF4amJicwHcLEkXRQndNrIKLZtC3hqXspFgljyQUdQuSn/O6vLiAfiO37w0aP1HSIcOocFkc3oNIh9CYS+w8uPtj36loJraGOmv5vQtV6SxydJiE2OjUVHsXQe5b1EBJQobaxEUrot3/37bd/Bv0o6OdHGxs3hSfGQPOx4wfTOcJz0fgiNpmcnZiYNdHHbib0jGF/oZTqdc6fN7iT37k4HOLvf3S+XV1yLOFUI+2MYFPWBtSxbIFNBewQ8r0MBSHWFzl3xghHhB67VUK+qJEJR+YiENlnjFC8G4hlG6InNwiHzmHhgVFLt2oVqki794DRIvTYIRS6oQ0vHcH6IyNYX3TU9FGKuEDo4Ae2i4RTw7YIhfUtTzjCp5/kGIZNhKYwLGTSkELP28kPbJfm0h47hDGh6ESEC5OTfFRPTfX3Y+hPhw2YYRTvBOPkjcrFmka6ZY0lwulXHolwJCRdciSCSR4bMuqrUDoiLTh6J3ZhOJg0BguEifnNZGgIFJobOTcSDYWiYmTLqWMK6+Z/4TgN8J9N12//nuCthI2pyyQhlGSxfbnH1K+0oUot9206QS3CcEai8o8SYUJFoShJE9MxsdCMTXs3bmwqtyOQlw4Jl2xBdHByNCk0KkVgAyEwxDZueGMJEQgobm/uJ2LTCWSxG9f024JtCKds3WXYlsaj2KQisM/Pb9wSGG7fAGPFNjalgvnq5v6NW9fals9AOKVNONJ6i7gTlO7EdfX2bXPv6u1fiC6gOIy2aM7BGsWVK1euXLly5cqVK1euXLly5cqVK1euXLly5cqVK1eu/h/q/wByNi2TmQvONgAAAABJRU5ErkJggg=="
                                className="img-fluid"
                                alt="Lets sign up" />
                        </div>
                        <div className='col col-lg-6 col-12'>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className='m-1 mt-2'>First Name</label>
                                        <input required type="text" value={fname} className="form-control" placeholder="First Name" onChange={handleNameChange} />
                                        {showErrfname && <small className="form-text text-danger">write a valid first name</small>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className='m-1 mt-2'>Last Name</label>
                                        <input required type="text" value={lname} className="form-control" placeholder="Last Name" onChange={handleLnameChange} />
                                        {showErrLname && <small className="form-text text-danger">write a valid last name</small>}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className='m-1 mt-2'>Mobile Number</label>
                                        <input required type="text" value={mnumber} className="form-control" placeholder="Mobile no." onChange={handleNumChange} />
                                        {showErrNum && <small className="form-text text-danger">It should contain numbers only</small>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className='m-1 mt-2' >Date Of Birth</label>
                                        <input required type="date" value={dob} className="form-control" placeholder="dob" onChange={handleDobChange} />
                                        {showErrDob && <small className="form-text text-danger">Enter valid dob for a student </small>}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className='m-1 mt-2 mb-1'>Email address</label>
                                        <input required type="email" value={email} className="form-control" placeholder="Email ID" onChange={handleEmailChange} />
                                        {showErrEmail && <small className="form-text text-danger">write a valid email</small>}
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Gender</label>
                            <div className='row m-1' onChange={(e)=>setGender(e.target.value)}>
                                    <div className='col-4' >
                                    <input required type="radio"  className="form-check-input" value="Male" name="Gender" />
                                    <label className="form-check-label">Male</label>
                                    </div>
                                    <div className='col-4'>
                                        <input required type="radio" className="form-check-input" value="Female" name="Gender" />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                    <div className='col-4'>
                                        <input required type="radio" className="form-check-input" value="Other" name="Gender" />
                                        <label className="form-check-label">Other</label>
                                    </div>
                            </div>
                            
                        </div>
                    </div> */}
                            </div>

                            <div className='row'>
                                <div className='col col-lg-6 col-12'>
                                    <div className="form-group">
                                        <label className='m-1 mt-2'>State</label>
                                        <input required type="text" value={state} className="form-control" placeholder="State" onChange={handleStateChange} />
                                        {showErrState && <small className="form-text text-danger">write a valid state</small>}
                                    </div>
                                </div>
                                <div className='col col-lg-6 col-12'>
                                    <div className="form-group">
                                        <label className='m-1 mt-2'>Course</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => setCourse(e.target.value)}>
                                            <option selected disabled>Select Course</option>
                                            <option value="B.tech(AI&DS)">B.tech(AI&DS)</option>
                                            <option value="B.tech(AI&ML)">B.tech(AI&ML)</option>
                                            <option value="B.tech(CSE)">B.tech(CSE)</option>
                                            <option value="B.com">B.com</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className='m-1 mt-2'>City</label>
                                        <input required type="text" value={city} className="form-control" placeholder="City" onChange={handleCityChange} />
                                        {showErrCity && <small className="form-text text-danger">write a valid city</small>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className='m-1 mt-2'>Pin Code</label>
                                        <input required type="text" value={pincode} className="form-control" placeholder="Pin Code" onChange={handlePinChange} />
                                        {showErrPin && <small className="form-text text-danger">Number should be not more than 6 digits</small>}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className='m-1 mt-3'>Address</label>
                                <textarea value={address} className="form-control" placeholder="Address" onChange={(e) => setAddress(e.target.value)}></textarea>
                                <small className="form-text text-muted">(Not more than 10 words)</small>

                            </div>

                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <button type="submit" className="btn btn-success m-4" form="form1">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default ExtraDetails;
