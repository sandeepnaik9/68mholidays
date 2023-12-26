
"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../store/stores'
import { setBannerImageS, setDestinationS, setIsEditing, setNofDays, setPackageName, setPricingS, setStatusS, setTourIncludesS, } from '../../../store/slices/packageSlice'

import AddDestination from '../../comonents/AddDestination'
import AddPricingData from '../../comonents/AddPricingData'
import KeyHighLights from '../../comonents/KeyHighLights'

import { Textarea } from '@nextui-org/react'
import { setItineraryS } from '../../../store/slices/itinerarySlice'
import { ToastContainer, toast } from 'react-toastify';
import { notFound, useRouter } from 'next/navigation'
import ClipLoader from "react-spinners/ClipLoader";
import OutsideAlerter from '../../comonents/submenu'

import groupBy from '../../api/utils/groupBy'

const Package = ({ params }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const [title, setTitle] = useState();
    const [isEditing, setIsEditings] = useState(false)
    const dispatch = useAppDispatch()
    const isEditingS = useAppSelector((state) => state.package.isEditing)
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const packageName = useAppSelector((state) => state.package.packageName)
    const bannerImage = useAppSelector((state) => state.package.bannerImage)
    const tourIncludesS = useAppSelector((state) => state.package.tourIncludes)
    const destinationS = useAppSelector((state) => state.package.destinations)
    const daysS = useAppSelector((state) => state.package.noOfDays)
    const pricingS = useAppSelector((state) => state.package.pricing)
    const itineraryS = useAppSelector((state) => state.itinerary.itinerary)
    const statusS = useAppSelector((state) => state.package.status)

    const role = useAppSelector((state) => state.auth.role)
    const username = useAppSelector((state) => state.auth.username)
    const mobile_number = useAppSelector((state) => state.auth.mobile_number)

    const imgRef = useRef();
    const [image, setFeaturedImage] = useState()
    const [isAuthS, setisAuth] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [sub, setSub] = useState(false);
    const [modal, setModal] = useState(false)

    const [labelModal,setLabelModal] = useState()


    const descriptionRef = useRef()
    const [description, setDescription] = useState()
    const [lunch, setLuch] = useState(true)
    const [breakfast, setBreakFast] = useState(true)
    const [dinner, setdinner] = useState(true)
    const [snacks, setSnacks] = useState(true)

    const [snackDesc, setSnackDesc] = useState()

    const [stay, setStay] = useState(false)
    const [sLocation, setStayLocation] = useState()

    const [isSight, setIsSight] = useState(true)
    const [sightSeeing, setSightSeeing] = useState([])
    const [sightSInput, setSightInput] = useState()

    const [indIte, setindIte] = useState(-1)

    const [status, setStatus] = useState()

    const [selectedCountry, setSelectedCountry] = useState("")
    const [places, setPlaces] = useState([])
    const [nights, setNights] = useState()
    const [addC, setAddC] = useState(false)

    const [price, setPrice] = useState(0)

    const [typemodal, setTypeModal] = useState();

    const textAreaRefs = useRef([])

    const resizeTextArea = (e) => {


        e.target.style.height = e.target.scrollHeight + 'px';
    };


    const [roomType, setRoomType] = useState()




    const [date, setDate] = useState([{ "start": new Date("2024-01-20"), "end": 30 }])
    const [placeinputValue, setPlaceInputValue] = useState('');
    const [itinerary, setItineary] = useState([]);
    const [tourDetails, setTourDetails] = useState(
        [
            {
                "flightDetails": [
                    {
                        "from": "",
                        "to": "",
                        "fDate_time": { "date": "", "time": "" },
                        "tDate_time": { "date": "", "time": "" }
                    },
                    {
                        "from": "",
                        "to": "",
                        "fDate_time": { "date": "", "time": "" },
                        "tDate_time": { "date": "", "time": "" }
                    }

                ],
                "accomoDation": [
                    {
                        "city/country": "City-India",
                        "hotel": "",
                        "checkin": "",
                        "checkout": "",
                    }
                ],
                "reportingAdnDroping": [
                    {
                        "guestType": "",
                        "reportingPoint": "",
                        "droppingPoint": ""
                    }
                ]
            },

        ]
    )

    const [pricing, setPricing] = useState([])
    const [tourInfo, setTourInfo] = useState([{
        "tourInc": [],
        "tourExc": [],
        "advancePrep": []
    }])

    const [textV, setTextV] = useState("");

    const [active, setActive] = useState("fDetails")

    const [keyHighlights, setKeyHighlights] = useState([])

    const [tourIncludes, setTourIncludes] = useState(
        [
            {
                "label": "Hotle",
                "provided": false,
                "svg": <svg _ngcontent-veenaworld-c60="" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><rect _ngcontent-veenaworld-c60="" x="3.46237" y="6.08789" width="10.9582" height="15.8285" fill="#F2DE72"></rect><rect _ngcontent-veenaworld-c60="" x="7.11337" y="17.0461" width="3.65273" height="4.8703" fill="white"></rect><path _ngcontent-veenaworld-c60="" d="M22.4248 21.8498H19.8873V0H11.4873V3.8027C11.4873 4.12018 11.7448 4.37772 12.0623 4.37772C12.3798 4.37772 12.6373 4.12016 12.6373 3.8027L12.6371 1.15008H18.7371V6.20766H17.3788C17.0613 6.20766 16.8038 6.46521 16.8038 6.78268C16.8038 7.10014 17.0613 7.3577 17.3788 7.3577H18.7371V9.18731H17.3788C17.0613 9.18731 16.8038 9.44487 16.8038 9.76233C16.8038 10.0798 17.0613 10.3373 17.3788 10.3373H18.7371V12.167H17.3788C17.0613 12.167 16.8038 12.4245 16.8038 12.742C16.8038 13.0594 17.0613 13.317 17.3788 13.317H18.7371V14.8985H17.3788C17.0613 14.8985 16.8038 15.156 16.8038 15.4735C16.8038 15.7909 17.0613 16.0485 17.3788 16.0485H18.7371V21.85H15.0313V5.8243H2.99499V21.85H0.575019C0.257541 21.85 0 22.1075 0 22.425C0 22.7425 0.257555 23 0.575019 23H22.4248C22.7423 23 22.9998 22.7424 22.9998 22.425C22.9998 22.1075 22.7421 21.85 22.4248 21.85L22.4248 21.8498ZM7.17121 21.8498V18.1646H8.43787L8.43805 21.8498H7.17121ZM9.58827 21.8498V18.1646H10.8547V21.8498H9.58827ZM12.0046 21.8498V17.0149H6.02159L6.02177 21.8498H4.14525V6.97369H13.882V21.8498H12.0046Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M6.11276 13.9634H7.3211V15.1721H6.11276V13.9634Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M8.40976 13.9634H9.61848V15.1721H8.40976V13.9634Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M10.7048 13.9634H11.9137V15.1721H10.7048V13.9634Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M6.11276 11.6265H7.3211V12.8352H6.11276V11.6265Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M8.40976 11.6265H9.61848V12.8352H8.40976V11.6265Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M10.7048 11.6265H11.9137V12.8352H10.7048V11.6265Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M6.11276 9.28931H7.3211V10.4982H6.11276V9.28931Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M8.40976 9.28931H9.61848V10.4982H8.40976V9.28931Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M10.7048 9.28931H11.9137V10.4982H10.7048V9.28931Z" fill="#595959"></path></svg>
            },
            {
                "label": "Meals",
                "provided": true,
                "svg": <svg _ngcontent-veenaworld-c60="" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g _ngcontent-veenaworld-c60="" clipPath="url(#clip0_6213_4849)"><path _ngcontent-veenaworld-c60="" fillRule="evenodd" clipRule="evenodd" d="M18.9955 18.1241V23.4416C18.9955 24.0212 18.5257 24.4911 17.9461 24.4911C17.3664 24.4911 16.8966 24.0212 16.8966 23.4416V13.0698L15.7483 11.645C15.7483 9.19254 15.7483 5.43666 15.7483 2.98428C15.7483 2.32785 16.042 1.69824 16.5652 1.23391C17.0883 0.769578 18.256 0.508789 18.9955 0.508789V13.5951" fill="#F2DE72"></path><path _ngcontent-veenaworld-c60="" d="M10.5868 9.16841V23.3551C10.5868 23.9537 10.1065 24.4416 9.50793 24.4509C8.89756 24.4603 8.3971 23.9692 8.39506 23.3588L8.34789 9.16841C8.34789 9.16841 6.03259 9.17691 6.03259 6.45453C6.03259 3.73214 6.03259 2.91797 6.03259 2.91797H13.0548V6.50541C13.0548 6.50541 12.953 9.16841 10.5868 9.16841Z" fill="#F2DE72"></path><path _ngcontent-veenaworld-c60="" d="M10.5189 16.3773C10.8 16.3773 11.0278 16.1495 11.0278 15.8685C11.0278 15.5874 10.8 15.3596 10.5189 15.3596C10.2379 15.3596 10.0101 15.5874 10.0101 15.8685C10.0101 16.1495 10.2379 16.3773 10.5189 16.3773Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M18.9897 16.3773C19.2708 16.3773 19.4986 16.1495 19.4986 15.8685C19.4986 15.5874 19.2708 15.3596 18.9897 15.3596C18.7087 15.3596 18.4809 15.5874 18.4809 15.8685C18.4809 16.1495 18.7087 16.3773 18.9897 16.3773Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M19.5044 0.508857C19.5044 0.227866 19.2766 0 18.9955 0C18.297 0 16.9278 0.231683 16.2273 0.853354C15.5995 1.41065 15.2393 2.18737 15.2393 2.98435V11.645C15.2393 11.7612 15.2791 11.8739 15.352 11.9644L16.3877 13.2494V23.4417C16.3877 24.3009 17.0868 25 17.9461 25C18.8053 25 19.5044 24.3009 19.5044 23.4417V18.1242C19.5044 17.8432 19.2766 17.6153 18.9956 17.6153C18.7145 17.6153 18.4867 17.8432 18.4867 18.1242V23.4417C18.4867 23.7398 18.2442 23.9823 17.9461 23.9823C17.648 23.9823 17.4055 23.7398 17.4055 23.4417V13.0698C17.4055 12.9537 17.3657 12.841 17.2928 12.7505L16.2571 11.4655V2.98429C16.2571 2.4706 16.4864 1.98414 16.9029 1.6145C17.2078 1.34389 17.8847 1.13638 18.4867 1.05506V13.5951C18.4867 13.8761 18.7145 14.104 18.9955 14.104C19.2766 14.104 19.5044 13.8761 19.5044 13.5951V0.508857Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M10.5396 17.6153C10.2586 17.6153 10.0308 17.8432 10.0308 18.1242V23.4219C10.0308 23.7183 9.78969 23.9594 9.49328 23.9594C9.19687 23.9594 8.95577 23.7183 8.95577 23.4219V9.04989C8.95577 8.7689 8.72796 8.54103 8.44692 8.54103C7.38071 8.54103 6.51326 7.67358 6.51326 6.60737V2.74006C6.51326 2.45907 6.28544 2.2312 6.0044 2.2312C5.72336 2.2312 5.49554 2.45907 5.49554 2.74006V6.60737C5.49554 8.06123 6.55239 9.27297 7.93806 9.51488V23.422C7.93806 24.2795 8.6357 24.9772 9.49328 24.9772C10.3509 24.9772 11.0485 24.2795 11.0485 23.422V18.1242C11.0485 17.8431 10.8206 17.6153 10.5396 17.6153Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M13.0034 2.2312C12.7223 2.2312 12.4945 2.45907 12.4945 2.74006V6.60737C12.4945 7.67358 11.6176 8.54103 10.5396 8.54103C10.2586 8.54103 10.0308 8.7689 10.0308 9.04989V13.5952C10.0308 13.8761 10.2586 14.104 10.5396 14.104C10.8207 14.104 11.0485 13.8761 11.0485 13.5952V9.51544C12.446 9.27506 13.5122 8.0625 13.5122 6.60737V2.74006C13.5122 2.45902 13.2844 2.2312 13.0034 2.2312Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M8.04502 7.30283C8.32606 7.30283 8.55388 7.07496 8.55388 6.79397V2.74006C8.55388 2.45907 8.32606 2.2312 8.04502 2.2312C7.76398 2.2312 7.53616 2.45907 7.53616 2.74006V6.79397C7.53616 7.07496 7.76398 7.30283 8.04502 7.30283Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M10.9627 7.30283C11.2438 7.30283 11.4716 7.07496 11.4716 6.79397V2.74006C11.4716 2.45907 11.2438 2.2312 10.9627 2.2312C10.6817 2.2312 10.4539 2.45907 10.4539 2.74006V6.79397C10.4539 7.07496 10.6817 7.30283 10.9627 7.30283Z" fill="#595959"></path></g><defs _ngcontent-veenaworld-c60=""><clipPath _ngcontent-veenaworld-c60="" id="clip0_6213_4849"><rect _ngcontent-veenaworld-c60="" width="25" height="25" fill="white"></rect></clipPath></defs></svg>
            },
            {
                "label": "Transport",
                "provided": true,
                "svg": <svg _ngcontent-veenaworld-c60="" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-veenaworld-c60="" d="M23.3947 18.8346H6.64074H2.37979C1.47081 18.8346 0.733887 18.0977 0.733887 17.1887V8.59951C0.733887 7.69054 1.47076 6.95361 2.37979 6.95361H23.3947C24.3036 6.95361 25.0406 7.69048 25.0406 8.59951V17.1887C25.0406 18.0976 24.3037 18.8346 23.3947 18.8346Z" fill="#F2DE72"></path><path _ngcontent-veenaworld-c60="" d="M5.59408 21.1318C6.84778 21.1318 7.8641 20.1155 7.8641 18.8618C7.8641 17.6081 6.84778 16.5918 5.59408 16.5918C4.34039 16.5918 3.32407 17.6081 3.32407 18.8618C3.32407 20.1155 4.34039 21.1318 5.59408 21.1318Z" fill="white"></path><path _ngcontent-veenaworld-c60="" d="M19.7126 21.1318C20.9662 21.1318 21.9826 20.1155 21.9826 18.8618C21.9826 17.6081 20.9662 16.5918 19.7126 16.5918C18.4589 16.5918 17.4425 17.6081 17.4425 18.8618C17.4425 20.1155 18.4589 21.1318 19.7126 21.1318Z" fill="white"></path><path _ngcontent-veenaworld-c60="" d="M25.0032 12.4345H0.733887V8.16405C0.733887 7.47492 1.29255 6.91626 1.98168 6.91626H23.7554C24.4446 6.91626 25.0032 7.47492 25.0032 8.16405V12.4345Z" fill="white"></path><path _ngcontent-veenaworld-c60="" d="M26.2119 9.15765H25.6804V8.54922C25.6804 7.3132 24.6748 6.30762 23.4388 6.30762H15.2709C14.9615 6.30762 14.7105 6.55851 14.7105 6.86802C14.7105 7.17753 14.9615 7.42842 15.2709 7.42842H23.4388C24.0568 7.42842 24.5596 7.93121 24.5596 8.54922V11.8743H16.7924V9.19536C16.7924 8.88585 16.5415 8.63496 16.232 8.63496C15.9226 8.63496 15.6716 8.88585 15.6716 9.19536V11.8743H10.1421V9.19536C10.1421 8.88585 9.89119 8.63496 9.58174 8.63496C9.27229 8.63496 9.02134 8.88585 9.02134 9.19536V11.8743H1.1208V8.54922C1.1208 7.93121 1.62359 7.42842 2.2416 7.42842H10.2553C10.5648 7.42842 10.8157 7.17753 10.8157 6.86802C10.8157 6.55851 10.5648 6.30762 10.2553 6.30762H2.2416C1.00558 6.30762 0 7.3132 0 8.54922V17.2332C0 18.4692 1.00558 19.4748 2.2416 19.4748H2.83132C3.11224 20.7417 4.24392 21.6923 5.59409 21.6923C6.94427 21.6923 8.076 20.7417 8.35687 19.4748H16.9497C17.2307 20.7417 18.3623 21.6923 19.7125 21.6923C21.0627 21.6923 22.1944 20.7417 22.4753 19.4748H23.3019C24.6133 19.4748 25.6803 18.4081 25.6803 17.097V10.2785H26.2118C26.5797 10.2785 26.879 10.5778 26.879 10.9457V12.3336C26.879 12.6431 27.13 12.894 27.4394 12.894C27.7489 12.894 27.9998 12.6431 27.9998 12.3336V10.9457C28 9.95981 27.1978 9.15765 26.2119 9.15765ZM5.59409 20.5715C4.65144 20.5715 3.88448 19.8045 3.88448 18.8618C3.88448 17.9191 4.65144 17.1522 5.59409 17.1522C6.53674 17.1522 7.30371 17.9191 7.30371 18.8618C7.30371 19.8045 6.5368 20.5715 5.59409 20.5715ZM19.7126 20.5715C18.7699 20.5715 18.0029 19.8045 18.0029 18.8618C18.0029 17.9191 18.7699 17.1522 19.7126 17.1522C20.6552 17.1522 21.4222 17.9191 21.4222 18.8618C21.4222 19.8045 20.6552 20.5715 19.7126 20.5715ZM23.302 18.354H22.4965C22.2564 17.0349 21.0998 16.0315 19.7126 16.0315C18.3253 16.0315 17.1688 17.035 16.9287 18.354H8.378C8.13792 17.0349 6.98137 16.0315 5.59409 16.0315C4.20682 16.0315 3.05032 17.035 2.81019 18.354H2.2416C1.62359 18.354 1.1208 17.8512 1.1208 17.2332V12.9951H24.5596V17.097C24.5596 17.7901 23.9955 18.354 23.302 18.354Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M5.58945 19.4409C5.89895 19.4409 6.14986 19.19 6.14986 18.8805C6.14986 18.571 5.89895 18.3201 5.58945 18.3201C5.27995 18.3201 5.02905 18.571 5.02905 18.8805C5.02905 19.19 5.27995 19.4409 5.58945 19.4409Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M19.7162 19.4409C20.0257 19.4409 20.2766 19.19 20.2766 18.8805C20.2766 18.571 20.0257 18.3201 19.7162 18.3201C19.4067 18.3201 19.1558 18.571 19.1558 18.8805C19.1558 19.19 19.4067 19.4409 19.7162 19.4409Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M12.7211 7.43013C13.0306 7.43013 13.2815 7.17923 13.2815 6.86973C13.2815 6.56023 13.0306 6.30933 12.7211 6.30933C12.4116 6.30933 12.1607 6.56023 12.1607 6.86973C12.1607 7.17923 12.4116 7.43013 12.7211 7.43013Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M14.9767 14.0972H8.32914C8.01969 14.0972 7.76874 14.3481 7.76874 14.6576C7.76874 14.9671 8.01969 15.218 8.32914 15.218H14.9767C15.2862 15.218 15.5371 14.9671 15.5371 14.6576C15.5371 14.3481 15.2862 14.0972 14.9767 14.0972Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M17.4752 15.229C17.7847 15.229 18.0356 14.9781 18.0356 14.6686C18.0356 14.3591 17.7847 14.1082 17.4752 14.1082C17.1657 14.1082 16.9148 14.3591 16.9148 14.6686C16.9148 14.9781 17.1657 15.229 17.4752 15.229Z" fill="#595959"></path></svg>
            },
            {
                "label": "Flight",
                "provided": true,
                "svg": <svg _ngcontent-veenaworld-c60="" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g _ngcontent-veenaworld-c60="" clipPath="url(#clip0_6213_4790)"><path _ngcontent-veenaworld-c60="" fillRule="evenodd" clipRule="evenodd" d="M3.53538 4.32324H2.15302C1.26861 4.32324 0.551819 3.60645 0.551819 2.72205C0.551819 2.28013 0.731173 1.87982 1.02095 1.58998C1.31022 1.30015 1.71053 1.12085 2.15302 1.12085H4.40115C5.15587 1.12085 5.78832 1.64287 5.95702 2.34523H6.82325C7.56515 2.34523 8.1667 2.94673 8.1667 3.68867C8.1667 4.05965 8.01617 4.39589 7.77332 4.63926C7.52996 4.88211 7.19423 5.03264 6.82325 5.03264H4.71975C4.20736 5.03259 3.76172 4.74544 3.53538 4.32324Z" fill="white"></path><path _ngcontent-veenaworld-c60="" fillRule="evenodd" clipRule="evenodd" d="M19.7914 23.3131H17.2316C16.4161 23.3131 15.7548 22.6518 15.7548 21.8362C15.7548 21.4285 15.9202 21.0591 16.1877 20.7922C16.4545 20.5248 16.8239 20.3594 17.2316 20.3594H20.5531C21.9446 20.3594 22.0289 21.896 22.0267 21.9254H23.1508C23.5585 21.9254 23.9279 22.0903 24.1948 22.3577C24.4622 22.6252 24.6276 22.994 24.6276 23.4017C24.6276 24.2172 23.9663 24.8786 23.1508 24.8786H21.2651C20.8573 24.8786 20.4509 24.7889 20.1938 24.512C19.8575 24.1498 19.7914 23.3131 19.7914 23.3131Z" fill="white"></path><path _ngcontent-veenaworld-c60="" fillRule="evenodd" clipRule="evenodd" d="M14.7519 12.2314H10.0543C10.0543 12.2314 8.72986 10.2831 7.36743 8.27905C7.14947 7.95853 7.19765 7.52598 7.4807 7.26176C7.76375 6.99754 8.19656 6.98103 8.49866 7.22305C11.3849 9.53468 14.7519 12.2314 14.7519 12.2314Z" fill="#F2DE72"></path><path _ngcontent-veenaworld-c60="" d="M8.04628 16.4385H10.2653L7.97415 21.3993C7.77456 21.8314 7.92494 22.3446 8.32623 22.6007C8.72753 22.8569 9.25633 22.7772 9.56422 22.4141L14.6331 16.4385H25.4815C25.4815 16.4385 25.6615 12.2335 21.1303 12.2312H2.93765C2.80347 10.8918 2.56652 9.55683 1.66882 9.07714C1.42659 8.94705 1.13386 8.95383 0.897897 9.09494C0.661933 9.23606 0.517456 9.49075 0.517456 9.76573V14.8777C0.517456 15.7397 1.21624 16.4385 2.07824 16.4385H3.39773" fill="#F2DE72"></path><path _ngcontent-veenaworld-c60="" d="M24.7397 13.0595C23.8854 12.1674 22.6711 11.7148 21.1303 11.714H14.9336L8.82223 6.81927C8.32345 6.41973 7.59491 6.44747 7.12758 6.88359C6.65446 7.32525 6.57539 8.03454 6.93954 8.57007L9.07683 11.714H3.40038C3.23308 10.3826 2.89745 9.1472 1.91364 8.6215C1.40399 8.34776 0.786083 8.44008 0.376146 8.85126C0.137077 9.091 0 9.42973 0 9.78052V14.8862C0 16.0275 0.928542 16.9561 2.06987 16.9561H3.39774C3.68348 16.9561 3.9152 16.7244 3.9152 16.4386C3.9152 16.1528 3.68348 15.9211 3.39774 15.9211H2.06987C1.4992 15.9211 1.03493 15.4569 1.03493 14.8862V9.78052C1.03493 9.70156 1.06194 9.62911 1.10909 9.58192C1.19369 9.49706 1.32032 9.47755 1.42495 9.53374C2.09579 9.89219 2.30102 11.0669 2.42278 12.283C2.44927 12.5475 2.67183 12.7489 2.93766 12.7489H10.0543H14.7519H21.1301C22.3736 12.7495 23.3344 13.0926 23.9859 13.7687C24.6529 14.4609 24.8664 15.3684 24.934 15.9212H14.633C14.481 15.9212 14.3367 15.9881 14.2384 16.1039L9.16961 22.0796C9.02182 22.2537 8.7621 22.283 8.57815 22.1465C8.41457 22.0251 8.36252 21.7926 8.45432 21.5938L10.735 16.6556C10.809 16.4954 10.7963 16.3085 10.7012 16.1597C10.606 16.0111 10.4417 15.9211 10.2652 15.9211H8.04624C7.7605 15.9211 7.52877 16.1528 7.52877 16.4386C7.52877 16.7244 7.7605 16.9561 8.04624 16.9561H9.45623L7.5147 21.1598C7.21855 21.8012 7.40634 22.5656 7.96127 22.9775C8.22327 23.1719 8.53095 23.2664 8.83667 23.2664C9.25525 23.2664 9.67015 23.0892 9.9588 22.749L14.8726 16.956H25.4814C25.7586 16.956 25.9866 16.7376 25.9984 16.4607C26.002 16.3792 26.0687 14.4472 24.7397 13.0595ZM10.3283 11.7139L7.79543 7.98812C7.72138 7.87925 7.73794 7.7296 7.83382 7.64008C7.9296 7.55066 8.0731 7.54522 8.1753 7.62698L13.2781 11.7139H10.3283Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M2.15297 4.84089H3.25786C3.60705 5.28483 4.14278 5.55024 4.71975 5.55024H6.8232C7.31966 5.55024 7.78683 5.35686 8.13954 5.00493C8.49069 4.653 8.68407 4.18563 8.68407 3.68881C8.68407 2.66272 7.84924 1.82794 6.82315 1.82794H6.3225C5.98191 1.09056 5.24126 0.603516 4.40105 0.603516H2.15297C1.5866 0.603516 1.05444 0.82406 0.655003 1.22427C0.254742 1.62458 0.0343018 2.15654 0.0343018 2.72223C0.0343018 3.89046 0.984733 4.84089 2.15297 4.84089ZM1.38717 1.95576C1.59141 1.75115 1.86339 1.6385 2.15302 1.6385H4.40115C4.90392 1.6385 5.33678 1.97889 5.45383 2.46629C5.50972 2.69894 5.71779 2.86293 5.95702 2.86293H6.82326C7.27873 2.86293 7.64924 3.23344 7.64924 3.68886C7.64924 3.90961 7.56323 4.11737 7.40779 4.27318C7.2513 4.42935 7.0437 4.51536 6.82326 4.51536H4.71975C4.41476 4.51536 4.13574 4.34816 3.99147 4.07903C3.90138 3.9109 3.72611 3.80601 3.53543 3.80601H2.15297C1.55539 3.80601 1.06923 3.31985 1.06923 2.72228C1.06923 2.43297 1.18204 2.16088 1.38717 1.95576Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M23.1508 21.408H22.4651C22.3861 21.1034 22.233 20.7294 21.9463 20.4207C21.5947 20.0421 21.113 19.842 20.5531 19.842H17.2316C16.6985 19.842 16.1977 20.0497 15.8221 20.4261C15.445 20.8024 15.2373 21.3033 15.2373 21.8364C15.2373 22.936 16.132 23.8307 17.2316 23.8307H19.3469C19.4178 24.1621 19.5545 24.5841 19.8146 24.8642C20.1423 25.2172 20.6303 25.3961 21.2651 25.3961H23.1508C24.2504 25.3961 25.1451 24.5015 25.1451 23.4018C25.1451 22.8694 24.9375 22.3687 24.561 21.9923C24.185 21.6156 23.6842 21.408 23.1508 21.408ZM23.1508 24.3612H21.2651C20.9393 24.3612 20.6935 24.2898 20.5731 24.16C20.4353 24.0116 20.3302 23.5488 20.3073 23.2717C20.2856 23.0029 20.0612 22.7958 19.7915 22.7958H17.2316C16.7026 22.7958 16.2722 22.3654 16.2722 21.8364C16.2722 21.5802 16.372 21.3395 16.5539 21.158C16.7347 20.9768 16.9754 20.877 17.2316 20.877H20.5531C20.9167 20.877 21.1639 21.0202 21.3311 21.3274C21.4807 21.6024 21.4795 22.1278 21.6341 22.2892C21.7333 22.3927 21.8829 22.443 22.0268 22.443H23.1509C23.4074 22.443 23.6481 22.5426 23.829 22.7238C24.0103 22.9052 24.1103 23.146 24.1103 23.4019C24.1102 23.9309 23.6798 24.3612 23.1508 24.3612Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M8.25948 14.6578C8.55425 14.6578 8.7932 14.4188 8.7932 14.124C8.7932 13.8293 8.55425 13.5903 8.25948 13.5903C7.96472 13.5903 7.72577 13.8293 7.72577 14.124C7.72577 14.4188 7.96472 14.6578 8.25948 14.6578Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M10.3945 14.6578C10.6892 14.6578 10.9282 14.4188 10.9282 14.124C10.9282 13.8293 10.6892 13.5903 10.3945 13.5903C10.0997 13.5903 9.86075 13.8293 9.86075 14.124C9.86075 14.4188 10.0997 14.6578 10.3945 14.6578Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M12.5294 14.6578C12.8242 14.6578 13.0631 14.4188 13.0631 14.124C13.0631 13.8293 12.8242 13.5903 12.5294 13.5903C12.2346 13.5903 11.9957 13.8293 11.9957 14.124C11.9957 14.4188 12.2346 14.6578 12.5294 14.6578Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M14.6644 14.6578C14.9591 14.6578 15.1981 14.4188 15.1981 14.124C15.1981 13.8293 14.9591 13.5903 14.6644 13.5903C14.3696 13.5903 14.1306 13.8293 14.1306 14.124C14.1306 14.4188 14.3696 14.6578 14.6644 14.6578Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M16.7993 14.6578C17.0941 14.6578 17.3331 14.4188 17.3331 14.124C17.3331 13.8293 17.0941 13.5903 16.7993 13.5903C16.5046 13.5903 16.2656 13.8293 16.2656 14.124C16.2656 14.4188 16.5046 14.6578 16.7993 14.6578Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M18.9343 14.6578C19.229 14.6578 19.468 14.4188 19.468 14.124C19.468 13.8293 19.229 13.5903 18.9343 13.5903C18.6395 13.5903 18.4005 13.8293 18.4005 14.124C18.4005 14.4188 18.6395 14.6578 18.9343 14.6578Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M5.88201 16.9537C6.16413 16.8682 6.32353 16.5702 6.23805 16.2881C6.15257 16.006 5.85458 15.8466 5.57246 15.9321C5.29035 16.0176 5.13094 16.3156 5.21642 16.5977C5.3019 16.8798 5.5999 17.0391 5.88201 16.9537Z" fill="#595959"></path></g><defs _ngcontent-veenaworld-c60=""><clipPath _ngcontent-veenaworld-c60="" id="clip0_6213_4790"><rect _ngcontent-veenaworld-c60="" width="26" height="26" fill="white"></rect></clipPath></defs></svg>
            },
            {
                "label": "sightseeing",
                "provided": true,
                "svg": <svg _ngcontent-veenaworld-c60="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-veenaworld-c60="" d="M21.9638 19.5379H2.03615C1.19272 19.5379 0.509033 18.8542 0.509033 18.0108V8.08522C0.509033 7.2418 1.19272 6.55811 2.03615 6.55811H21.9638C22.8073 6.55811 23.491 7.2418 23.491 8.08522V18.0108C23.491 18.8542 22.8073 19.5379 21.9638 19.5379Z" fill="#F2DE72"></path><path _ngcontent-veenaworld-c60="" d="M3.1936 4.46191H7.26072V6.55803H3.1936V4.46191Z" fill="white"></path><path _ngcontent-veenaworld-c60="" d="M12 17.4903C14.4534 17.4903 16.4422 15.5014 16.4422 13.048C16.4422 10.5946 14.4534 8.60571 12 8.60571C9.54655 8.60571 7.55768 10.5946 7.55768 13.048C7.55768 15.5014 9.54655 17.4903 12 17.4903Z" fill="white"></path><path _ngcontent-veenaworld-c60="" d="M12 15.4665C13.3357 15.4665 14.4184 14.3838 14.4184 13.0481C14.4184 11.7124 13.3357 10.6296 12 10.6296C10.6643 10.6296 9.58154 11.7124 9.58154 13.0481C9.58154 14.3838 10.6643 15.4665 12 15.4665Z" fill="white"></path><path _ngcontent-veenaworld-c60="" d="M21.9638 6.049H7.76981V4.46192C7.76981 4.18083 7.54187 3.95288 7.26077 3.95288H3.19361C2.91252 3.95288 2.68457 4.18083 2.68457 4.46192V6.04905H2.03615C0.913419 6.04905 0 6.96247 0 8.08521V18.0107C0 19.1335 0.913419 20.0469 2.03615 20.0469H21.9638C23.0866 20.0469 24 19.1335 24 18.0107V8.08515C24 6.96247 23.0865 6.049 21.9638 6.049ZM3.70265 4.97096H6.75169V6.04905H3.70265V4.97096ZM22.9819 18.0107C22.9819 18.5721 22.5252 19.0288 21.9638 19.0288H2.03615C1.47479 19.0288 1.01808 18.5721 1.01808 18.0107V8.08515C1.01808 7.52379 1.47479 7.06708 2.03615 7.06708H3.19361H7.26072H21.9638C22.5252 7.06708 22.9819 7.52379 22.9819 8.08515L22.9819 18.0107Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M12 8.09668C9.26978 8.09668 7.04865 10.3178 7.04865 13.048C7.04865 15.7782 9.26978 17.9993 12 17.9993C14.7301 17.9993 16.9513 15.7782 16.9513 13.048C16.9513 10.3178 14.7301 8.09668 12 8.09668ZM12 16.9812C9.8312 16.9812 8.06672 15.2168 8.06672 13.0479C8.06672 10.8791 9.83115 9.11471 12 9.11471C14.1688 9.11471 15.9332 10.8791 15.9332 13.0479C15.9332 15.2168 14.1688 16.9812 12 16.9812Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M12 10.1206C10.3858 10.1206 9.07251 11.4339 9.07251 13.0481C9.07251 14.6623 10.3858 15.9756 12 15.9756C13.6142 15.9756 14.9275 14.6623 14.9275 13.0481C14.9275 11.4339 13.6142 10.1206 12 10.1206ZM12 14.9574C10.9471 14.9574 10.0906 14.1009 10.0906 13.048C10.0906 11.9952 10.9471 11.1386 12 11.1386C13.0528 11.1386 13.9094 11.9952 13.9094 13.048C13.9094 14.1009 13.0528 14.9574 12 14.9574Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M2.57007 11.2153C2.28898 11.2153 2.06104 11.4433 2.06104 11.7244V17.222C2.06104 17.5031 2.28898 17.731 2.57007 17.731C2.85116 17.731 3.07911 17.5031 3.07911 17.222V11.7244C3.07911 11.4432 2.85122 11.2153 2.57007 11.2153Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M2.57013 9.94288C2.85127 9.94288 3.07917 9.71498 3.07917 9.43384C3.07917 9.15271 2.85127 8.9248 2.57013 8.9248C2.289 8.9248 2.0611 9.15271 2.0611 9.43384C2.0611 9.71498 2.289 9.94288 2.57013 9.94288Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M21.405 15.3897C21.6861 15.3897 21.914 15.1618 21.914 14.8807V9.38306C21.914 9.10197 21.6861 8.87402 21.405 8.87402C21.1239 8.87402 20.8959 9.10197 20.8959 9.38306V14.8806C20.8959 15.1618 21.1239 15.3897 21.405 15.3897Z" fill="#595959"></path><path _ngcontent-veenaworld-c60="" d="M21.405 17.6804C21.6862 17.6804 21.9141 17.4525 21.9141 17.1714C21.9141 16.8903 21.6862 16.6624 21.405 16.6624C21.1239 16.6624 20.896 16.8903 20.896 17.1714C20.896 17.4525 21.1239 17.6804 21.405 17.6804Z" fill="#595959"></path></svg>
            }
        ])




    const [travellers, setTravellers] = useState({ "Adults": 0, "child": 0, "infants": 0 })

    const [rooms, setRooms] = useState([{ "roomno": "1", "Adults": 0, "Kids": 0, "infants": 0 }]);
    const [IPlaces, setIPlaces] = useState([]);
    const [inputPlaces, setInputPlaces] = useState("");
    const [keyHighlight, setKeyHighlight] = useState()

    const [INights, setINights] = useState(0)

    const [days, setDays] = useState(0);
    const [cities, setCities] = useState(0);
    const [destinations, setDestinations] = useState([])




    const numberValidation = (e, func) => {
        if (e.target.value.match(/^\d+$/)) {

            func(e.target.value.replace(/^0+/, ''))
        }
        else if (price.length == 1) {
            func(0)
        }


    }

    useLayoutEffect(() => {
        isEditingS ? setIsEditings(true) : setIsEditings(false)
        isAuth ? setisAuth(true) : setisAuth(false)

        async function getPacka() {
            console.log(params)
            const res = await getPackage(params.pn)
            console.log(res)
            if (!(res.data[0])) {
                return router.push("/not-found")
            }


            setTitle(res.data[0]?.package_name || "Enter Title")
            setFeaturedImage(res?.data[0]?.BannerImage || "/assets/banner.jpeg")
            setDestinations(JSON.parse(res?.data[0]?.destinations) || [])
            const updatedTourIncludes = tourIncludes?.map(item => {
                const matchingItem = JSON.parse(res?.data[0]?.TourIncludes)?.find(otherItem => otherItem.label === item.label);
                if (matchingItem) {
                    return { ...item, provided: matchingItem.provided };
                }
                return item;
            }) || [];

            setTourIncludes(updatedTourIncludes);

            setDays(res?.data[0]?.N_Days || 0)
            setPricing(JSON.parse(res?.data[0]?.pricingTable) || [])
            setItineary(res?.data[0]?.itinerarydetails || [])
            setStatus(res?.data[0].Status || "Added")
            if (!res.data[0]?.package_name) {
                handlEdit()
            }
            setLoading(false)

            // dispatch(setPackageName(res.data[0].package_name))
            // dispatch(setFeaturedImage(res.data[0].BannerImage))

        }
        if (!isEditingS) {
            console.log("Getting package from db")
            getPacka();
        } else {
            const updatedTourIncludes = tourIncludes.map(item => {
                const matchingItem = tourIncludesS.find(otherItem => otherItem.label === item.label);
                if (matchingItem) {
                    return { ...item, provided: matchingItem.provided };
                }
                return item;
            });
            console.log(updatedTourIncludes)
            setTourIncludes(updatedTourIncludes || []);
            setTitle(packageName || "")
            setFeaturedImage(bannerImage || "/assets/banner.jpeg")
            setDays(daysS || 0)
            setDestinations(destinationS || [])
            setPricing(pricingS || [])
            setItineary(itineraryS || [])
            setStatus(statusS || "Added")
            setLoading(false)

            // setTourIncludes(tourIncludesS)
        }
    }, [isEditingS, packageName, params.pn, bannerImage, tourIncludesS])



    const handleAccordion = (e, i) => {
        const ele = document.querySelectorAll(".accordiontoggle")[i]
        if (ele.classList.contains("fa-minus") && ele.classList.contains("fa-minus")) {
            ele.classList.remove("fa-minus")
            ele.classList.add("fa-plus")
        }
        else {
            ele.classList.remove("fa-plus")
            ele.classList.add("fa-minus")
        }
        const el = document.querySelector(`#accordionContent-${i}`)
        if (!el.classList.contains("show")) {
            el.classList.add("show");
            // document.querySelector("#accordionContent-1").style.height = "482px"
        }
        else {
            el.classList.remove("show");
            // document.querySelector("#accordionContent-1").style.height = "482px"
        }
    }


    const updateSightSeeing = () => {
        console.log(sightSInput, "Sight Seeign Add")
        console.log(!sightSeeing?.includes(sightSInput) && sightSInput != "")
        console.log(sightSeeing)
        if (!sightSeeing?.includes(sightSInput) && sightSInput != "") {
            setSightSeeing([...sightSeeing, sightSInput])
        }
    }

    const editItinerary = (i) => {
        const el = document.querySelector(`#accordionContent-${i}`)
        const ele = document.querySelectorAll(".accordiontoggle")[i]
        if (ele.classList.contains("fa-minus") && ele.classList.contains("fa-minus")) {
            ele.classList.remove("fa-minus")
            ele.classList.add("fa-plus")
        }
        else {
            ele.classList.remove("fa-plus")
            ele.classList.add("fa-minus")
        }
        setINights("")
        setInputPlaces("")
        if (indIte == i || !indIte < 0) {
            let update = [...itinerary]
            if (i >= 0) {
                update[i] = {
                    ...update[i],
                    "decription": description?.replace(/\n/g, '<br>'),
                    "lunch": lunch,
                    "breakFast": breakfast,
                    "dinner": dinner,
                    "snack": snacks,
                    "Stay": stay,
                    "sightseeing": isSight,
                    "sightseeingDetails": sightSeeing,
                    "nightStayLocation": sLocation,
                    "snackDetail": snackDesc,
                    "places": IPlaces,
                    "nights": INights

                }
                setItineary(update)
                dispatch(setItineraryS(update));
                if (indIte == i) {
                    setindIte(-1);
                }
                else {
                    setindIte(i);

                    el.classList.add("show")
                    setDescription(itinerary[i]?.decription?.replace(/<br>/g, '\n'));
                    setLuch(itinerary[i]?.lunch)
                    setBreakFast(itinerary[i]?.breakFast)
                    setdinner(itinerary[i]?.dinner)
                    setIsSight(itinerary[i]?.sightseeing)
                    setSightSeeing(itinerary[i]?.sightseeingDetails || [])
                    setStay(itinerary[i]?.Stay)
                    setStayLocation(itinerary[i]?.nightStayLocation)
                    setSnacks(itinerary[i]?.snack)
                    setSnackDesc(itinerary[i]?.snackDetail)
                    setIPlaces(itinerary[i]?.places || [])
                    setINights(itinerary[i]?.nights)
                    dispatch(setItineraryS(itinerary));
                }


            }


        }
        else {
            setindIte(i);
            el.classList.add("show")
            setDescription(itinerary[i]?.decription?.replace(/<br>/g, '\n'));
            setLuch(itinerary[i]?.lunch)
            setBreakFast(itinerary[i]?.breakFast)
            setdinner(itinerary[i]?.dinner)
            setIsSight(itinerary[i]?.sightseeing)
            setSightSeeing(itinerary[i]?.sightseeingDetails || [])
            setStay(itinerary[i]?.Stay)
            setStayLocation(itinerary[i]?.nightStayLocation)
            setSnacks(itinerary[i]?.snack)
            setSnackDesc(itinerary[i]?.snackDetail)
            setIPlaces(itinerary[i]?.places || [])
            setINights(itinerary[i]?.nights)
            dispatch(setItineraryS(itinerary));

        }
    }


    const handlePlace = (c, e) => {
        console.log(c, e.target.value)
    }

    const handleTD = (clas, e) => {


        setActive(clas)
        if (clas == "fDetails") {
            document.querySelector(".aDetails")?.classList?.remove("show")
            document.querySelector(".rdDetails")?.classList?.remove("show")
        }
        if (clas == "aDetails") {
            document.querySelector(".fDetails")?.classList?.remove("show")
            document.querySelector(".rdDetails").classList.remove("show")
        }
        if (clas == "rdDetails") {
            document.querySelector(".aDetails")?.classList?.remove("show")
            document.querySelector(".fDetails")?.classList?.remove("show")
        }
        document.querySelector(`.${clas}`)?.classList?.add("show")
    }

    const uploadFile = async (e) => {
        console.log(e)
        const form = new FormData();
        form.append("image", imgRef.current.files[0])
        const response = await fetch("/api/utils/file", { method: "POST", body: form });
        const res = await response.json();
        console.log(res.imgPath)
        setFeaturedImage(res.imgPath)
        dispatch(setBannerImageS(res.imgPath))
    }

    const handleTourInclude = (label) => {
        const updatedTourIncludes = tourIncludes.map(item =>
            item.label === label ? { ...item, provided: !item.provided } : item
        );

        setTourIncludes(updatedTourIncludes);
        dispatch(setTourIncludesS(updatedTourIncludes))
    }

    const handlEdit = () => {


        dispatch(setPackageName(title));
        dispatch(setBannerImageS(image))
        dispatch(setItineraryS(itinerary))
        dispatch(setTourIncludesS(tourIncludes.map((el) => { return { "label": el.label, "provided": el.provided } })));
        dispatch(setNofDays(days));
        dispatch(setDestinationS(destinations))
        dispatch(setPricingS(pricing));
        dispatch(setStatusS(status));
        dispatch(setIsEditing(!isEditingS));

    }

    const handleSave = async () => {

        // if (image == "/assets/banner.jpeg"&&title.toLowerCase()!=""&&destinations.length != 0&&itinerary.length != 0) {
        //     alert("Kindly upload image");
        // } else if (image != "/assets/banner.jpeg"&&title.toLowerCase() == ""&&destinations.length != 0&&itinerary.length != 0) {
        //     alert("Condition: title.toLowerCase() == 'edit title'");
        // } else if (image != "/assets/banner.jpeg"&&title.toLowerCase() != ""&&destinations.length == 0&&itinerary.length != 0) {
        //     alert("Condition: destinations.length <= 0");
        // } else if (image != "/assets/banner.jpeg"&&title.toLowerCase() != ""&&destinations.length != 0&&itinerary.length == 0) {
        //     alert("Condition: itinerary.length <= 0");
        // } else
        if (image == "/assets/banner.jpeg" || title.toLowerCase() == "" || destinations.length == 0 || itinerary.length == 0) {
            alert("Make sure all the fields are filled")
        }
        else {
            const data = textV.replace(/\n/g, '<br>')
            await fetch("/api/package/updatePackage", { method: "POST", body: JSON.stringify({ "code": params.pn.split("#")[0], "packageName": title, "bannerImage": image, "destinations": destinations, "tourIncludes": tourIncludes.map((el) => { return { "label": el.label, "provided": el.provided } }), "nDays": days, "destinations": destinations, "pricingTable": pricing, "itinerary": itinerary }) })
            setindIte(-1)

            dispatch(setIsEditing(!isEditingS))
            setIsEditings(!isEditing)
            router.refresh()
        }



    }



    const removeCountry = (country) => {
        const updated = []
        for (let i = 0; i < destinations?.length; i++) {
            if (destinations[i].country != country) {
                updated.push(destinations[i])
            }
        }
        setDestinations(updated)
    }

    const deleteSightSeeing = (ind) => {
        const update = []
        sightSeeing.map((el, i) => {
            if (i != ind) {
                update.push(el)
            }
        })
        setSightSeeing(update)
    }

    const removePlace = (country, place) => {
        const updated = []
        for (let i = 0; i < destinations?.length; i++) {
            if (!(destinations[i].country == country && destinations[i].place == place)) {
                updated.push(destinations[i])
            }
        }
        setDestinations(updated)
    }

    const handleCountry = () => {
        if (placeinputValue != "" || inputValue != "" || nights != "") {
            setDestinations([...destinations, { "place": placeinputValue, "nights": nights, "country": inputValue }])
            dispatch(setDestinationS([...destinations, { "place": placeinputValue, "nights": nights, "country": inputValue }]))
            setInputValue("")
            setNights("")
            setPlaceInputValue("")
        }
    }

    const addDate = (i) => {
        let date_ = new Date(date[0].start)
        date_.setDate(date_.getDate() + i)
        return date_.toDateString()
    }

    const resizeTextAreaDire = (i) => {
        const textArea = document.querySelectorAll("textarea")[i]
        if (textArea) {
            textArea.style.height = document.querySelectorAll("textarea")[i].scrollHeight + "px";
        }
    }
    const renderTextWithLineBreaksAndSpaces = (text) => {
        return text.split('\n').map((line, index) => (
            <div className='h-100' key={index}>
                {line.replace(/ /g, '\u00a0')} {/* Replaces spaces with &nbsp; */}
                {index !== text.split('\n').length - 1 && <br />} {/* Adds <br> except for the last line */}
            </div>
        ));
    };


    const addIPlaces = () => {
        if (!IPlaces?.includes(inputPlaces) && inputPlaces != "") {
            setIPlaces([...IPlaces, inputPlaces])

        }
        toast("Added place in itinerary")
    }

    const removeIPlaces = (ind) => {
        let update = []
        IPlaces.map((el, i) => {
            if (i != ind) {
                update.push(el)
            }
        })
        setIPlaces(update)
    }

    const handlePublish = async () => {
        console.log("PUBLISH")
        if (image == "/assets/banner.jpeg" || title.toLowerCase() == "" || destinations.length || itinerary.length) {
            alert("Kindly make sure all the changes are made before publishing")
        }
        else {
            await fetch(`/api/package/publishPackage`, { body: JSON.stringify({ "code": params.pn, "status": "PUBLISHED" }), method: "POST", headers: { 'Content-Type': 'application/json' } })
        }

    }
    const handleDelete = async () => {
        await fetch(`/api/package/deletePackage`, { body: JSON.stringify({ "code": params.pn }), method: "POST", headers: { 'Content-Type': 'application/json' } })
        toast("Deleted Pakcage")
        router.push("/package")
    }

    useEffect(() => {

    }, [])

    return (
        loading ? <div className='w-100 h-100 d-flex position-relative justify-content-center align-items-center'> <ClipLoader /></div> : (<>

            <div>
                <ToastContainer
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                {/* Same as */}

                <div className='container-fluid position-relative px-0 pt-5'>
                    {(role == process.env.NEXT_PUBLIC_ADMIN || role == process.env.NEXT_PUBLIC_SUPER_ADMIN) && (<div className='position-absolute' style={{ right: 10, top: 10 }}>
                        <span style={{ fontSize: 12 }} className='rounded-pill border p-2'>Status: {status}</span>
                    </div>)}
                    {/* <div>
                    <div>
                        <h4>{title}</h4>
                        <div className='d-flex column-gap-2'>
                            <div>
                                6 Days
                            </div> 
                            <div>
                                3 Cities
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div> */}
                    <div className='container'>
                        <div className="row w-100">

                            <div className="col-8 col-md-12  d-flex flex-column justify-content-center">
                                {isEditing ? (<input className='fw-semibold aEdit h3' onChange={(e) => { dispatch(setPackageName(e.target.value)); setTitle(e.target.value) }} placeholder='Edit Title' defaultValue={title} style={{ outline: 'none', border: "none", background: "none" }} />) : <h1 className='fw-semibold '>{title}</h1>}

                                <div className='d-flex align-items-center column-gap-3' style={{ fontSize: "14px", fontWeight: "400" }}>
                                    <div className='d-flex align-items-center'>
                                        <svg className='me-1' _ngcontent-veenaworld-c150="" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-veenaworld-c150="" fillRule="evenodd" clipRule="evenodd" d="M11.375 9.75V3.0315C11.375 2.252 10.756 1.625 10 1.625H2C1.244 1.625 0.625 2.252 0.625 3.0315C0.625 3.031 0.625 9.719 0.625 9.719C0.625 10.498 1.244 11.125 2 11.125H10C10.3645 11.125 10.7145 10.98 10.9725 10.7225C11.23 10.4645 11.375 10.1145 11.375 9.75ZM10.625 9.75C10.625 9.916 10.559 10.0745 10.442 10.192C10.3245 10.309 10.166 10.375 10 10.375H2C1.652 10.375 1.375 10.078 1.375 9.719V3.0315C1.375 2.672 1.652 2.375 2 2.375H10C10.348 2.375 10.625 2.672 10.625 3.0315V9.75Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" fillRule="evenodd" clipRule="evenodd" d="M2.375 1.25V2.75C2.375 2.957 2.543 3.125 2.75 3.125C2.957 3.125 3.125 2.957 3.125 2.75V1.25C3.125 1.043 2.957 0.875 2.75 0.875C2.543 0.875 2.375 1.043 2.375 1.25Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" fillRule="evenodd" clipRule="evenodd" d="M8.875 1.25V2.75C8.875 2.957 9.043 3.125 9.25 3.125C9.457 3.125 9.625 2.957 9.625 2.75V1.25C9.625 1.043 9.457 0.875 9.25 0.875C9.043 0.875 8.875 1.043 8.875 1.25Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" fillRule="evenodd" clipRule="evenodd" d="M5.625 1.25V2.75C5.625 2.957 5.793 3.125 6 3.125C6.207 3.125 6.375 2.957 6.375 2.75V1.25C6.375 1.043 6.207 0.875 6 0.875C5.793 0.875 5.625 1.043 5.625 1.25Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" fillRule="evenodd" clipRule="evenodd" d="M1 5.125H11C11.207 5.125 11.375 4.957 11.375 4.75C11.375 4.543 11.207 4.375 11 4.375H1C0.793 4.375 0.625 4.543 0.625 4.75C0.625 4.957 0.793 5.125 1 5.125Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" d="M3.3335 6.25H3.6665C3.8505 6.25 4 6.3995 4 6.5835V6.9165C4 7.1005 3.8505 7.25 3.6665 7.25H3.3335C3.1495 7.25 3 7.1005 3 6.9165V6.5835C3 6.3995 3.1495 6.25 3.3335 6.25Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" d="M3.3335 8.25H3.6665C3.8505 8.25 4 8.3995 4 8.5835V8.9165C4 9.1005 3.8505 9.25 3.6665 9.25H3.3335C3.1495 9.25 3 9.1005 3 8.9165V8.5835C3 8.3995 3.1495 8.25 3.3335 8.25Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" d="M5.8335 6.25H6.1665C6.3505 6.25 6.5 6.3995 6.5 6.5835V6.9165C6.5 7.1005 6.3505 7.25 6.1665 7.25H5.8335C5.6495 7.25 5.5 7.1005 5.5 6.9165V6.5835C5.5 6.3995 5.6495 6.25 5.8335 6.25Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" d="M5.8335 8.25H6.1665C6.3505 8.25 6.5 8.3995 6.5 8.5835V8.9165C6.5 9.1005 6.3505 9.25 6.1665 9.25H5.8335C5.6495 9.25 5.5 9.1005 5.5 8.9165V8.5835C5.5 8.3995 5.6495 8.25 5.8335 8.25Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" d="M8.3335 6.25H8.6665C8.8505 6.25 9 6.3995 9 6.5835V6.9165C9 7.1005 8.8505 7.25 8.6665 7.25H8.3335C8.1495 7.25 8 7.1005 8 6.9165V6.5835C8 6.3995 8.1495 6.25 8.3335 6.25Z" fill="#595959"></path><path _ngcontent-veenaworld-c150="" d="M8.3335 8.25H8.6665C8.8505 8.25 9 8.3995 9 8.5835V8.9165C9 9.1005 8.8505 9.25 8.6665 9.25H8.3335C8.1495 9.25 8 9.1005 8 8.9165V8.5835C8 8.3995 8.1495 8.25 8.3335 8.25Z" fill="#595959"></path></svg>
                                        <span>{isEditing ? (<input className="aEdit small" onChange={(e) => { setDays(e.target.value); dispatch(setNofDays(e.target.value)) }} defaultValue={days}></input>) : days}</span> Days
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <svg className='me-1' _ngcontent-veenaworld-c150="" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-veenaworld-c150="" fillRule="evenodd" clipRule="evenodd" d="M6.84146 1.14286C3.70321 1.14286 1.14286 3.73018 1.14286 6.93875C1.14286 9.39438 2.35137 11.3809 3.72173 12.7725C4.40528 13.4667 5.11798 14.0007 5.71451 14.358C6.01299 14.5367 6.2756 14.6672 6.48474 14.751C6.58927 14.793 6.67501 14.8211 6.74121 14.8381C6.81128 14.8561 6.84181 14.8571 6.84146 14.8571L6.84153 14.8571C6.84318 14.8571 6.87396 14.8555 6.94172 14.8381C7.00792 14.8211 7.09366 14.793 7.19819 14.751C7.40733 14.6672 7.66994 14.5367 7.96842 14.358C8.56495 14.0007 9.27765 13.4667 9.9612 12.7725C11.3316 11.3809 12.5401 9.39438 12.5401 6.93875C12.5401 3.73018 9.97972 1.14286 6.84146 1.14286ZM0 6.93875C0 3.11565 3.05551 0 6.84146 0C10.6274 0 13.6829 3.11565 13.6829 6.93875C13.6829 9.78924 12.2789 12.0476 10.7755 13.5744C10.0222 14.3394 9.2327 14.9329 8.55562 15.3384C8.2173 15.5411 7.90025 15.7008 7.62363 15.8118C7.36403 15.9159 7.08484 16 6.84146 16C6.59809 16 6.3189 15.9159 6.0593 15.8118C5.78268 15.7008 5.46563 15.5411 5.12731 15.3384C4.45023 14.9329 3.66074 14.3394 2.90741 13.5744C1.404 12.0476 0 9.78924 0 6.93875ZM4.18002 6.93875C4.18002 5.45989 5.36393 4.24488 6.84146 4.24488C8.31901 4.24488 9.5029 5.45989 9.5029 6.93875C9.5029 8.41759 8.31902 9.63265 6.84146 9.63265C5.36391 9.63265 4.18002 8.41759 4.18002 6.93875ZM6.84146 5.38774C6.01163 5.38774 5.32288 6.07442 5.32288 6.93875C5.32288 7.80309 6.01164 8.48979 6.84146 8.48979C7.67129 8.48979 8.36005 7.80309 8.36005 6.93875C8.36005 6.07442 7.6713 5.38774 6.84146 5.38774Z" fill="#333333"></path></svg>
                                        {destinations?.length || 0} Cities
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between py-3'>
                                    <div className='d-flex column-gap-3' style={{ fontSize: "14px", fontWeight: "400" }}>
                                        {destinations.slice(0, 3).map((el, i) => (<div key={i}>
                                            {el.place} ({el.nights}N) {(i < destinations.slice(0, 3).length - 1) && "---"}
                                        </div>))}
                                        <div className='position-relative d-flex'>
                                            {destinations?.length > 3 && <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setSub(!sub)}>+{destinations.length - 3}</span>}
                                            {isEditing && <div className='ms-3' onClick={() => { setTypeModal("destinations");setLabelModal("Add destinations"); setModal(!modal) }} style={{ cursor: "pointer" }}><i className="fa-solid fa-pen"></i></div>}
                                            {sub && <OutsideAlerter sub={sub} setSub={setSub}>
                                                <div className='position-absolute ps-3 pt-3 pe-3 sub text-black bg-white rounded-2' style={{
                                                    top: "110%",
                                                    left: '50%',
                                                    transform: ' translate(-50%)', width: 300, height: 200, zIndex: 3
                                                }}>
                                                    <div className='d-flex justify-content-center align-items-center column-gap-2'>
                                                        <div>{days} Days</div>
                                                        <div>{destinations.length} Cities</div>
                                                    </div>
                                                    {Object.entries(groupBy(destinations, "country")).map(el => (<><div key={el[0]} className='mt-2' style={{ fontWeight: "bold" }}>{el[0]}</div>{el[1].map(e => (<div key={el[0] + "-" + e.place} style={{ paddingLeft: 15 }}>{e.place}</div>))}</>))}
                                                </div>
                                            </OutsideAlerter>}
                                        </div>
                                    </div>
                                    <div className='d-flex column-gap-3 align-items-center'>
                                        <div>
                                            <img width={20} alt='whatsapp' height={20} src={"https://www.veenaworld.com/whatsapp.eeae0bc43d64cfc9.svg"} />
                                        </div>
                                        <div>
                                            <img width={20} alt='print' height={20} src={"https://www.veenaworld.com/print.d4177d1291fc6484.svg"} />
                                        </div>
                                        <div>
                                            <img width={20} alt='print' height={20} src={"https://www.veenaworld.com/print.d4177d1291fc6484.svg"} />
                                        </div>
                                        <div>
                                            <img width={20} alt='print' height={20} src={"https://www.veenaworld.com/print.d4177d1291fc6484.svg"} />
                                        </div>
                                        <a href="#itinerary">
                                            View itinerary
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div className="col-4 d-none row d-lg-flex position-absolute justify-content-end" style={{ right: 30 }}>
                                <div className='col-7'>
                                    <div className='d-flex justify-content-end align-items-center' style={{ fontWeight: "500", fontSize: "12px", color: "green" }}>
                                        SUPER DEAL PRICE
                                    </div>
                                    <div className='d-flex justify-content-end align-items-center'>
                                        <span className='h-100 me-2' style={{ fontWeight: "400", fontSize: "12px" }}>Starts From</span><h4 className='h4 d-flex p-0 m-0 h-100 justify-content-end align-items-center'>₹ {pricing.filter(el => el.roomType === "Twin Sharing")[0]?.price}</h4>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{ fontWeight: "300", fontSize: "9px" }}>
                                        per person on twin sharing
                                    </div>
                                    {/* <div className='d-flex justify-content-end'>
                                        
                                        from ₹2,615/month
                                    </div> */}
                                </div>
                                <div className='d-flex col-5  flex-column justify-content-center align-items-center'>
                                    <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: "45px", backgroundColor: "rgb(255, 216, 0)", appearance: "button", borderRadius: "5px", fontFamily: "Muli, sans-serif", fontSize: "14px", cursor: "pointer" }}>
                                        Dates & Prices
                                    </div>
                                    <div className='d-flex w-100 justify-content-center align-items-center'>
                                        <div className='w-100 d-flex justify-content-center align-items-center' onClick={() => {   setLabelModal("Add Price");setTypeModal("pricetable");setModal(!modal) }} style={{ height: "25px!important", width: "150px!important", fontWeight: "400", margin: "10px 0 10px 0", backgroundColor: "rgb(202, 206, 220)", appearance: "button", borderRadius: "5px", fontFamily: "Muli, sans-serif", fontSize: "10px", cursor: "pointer" }}>
                                            View Pricing Table
                                        </div>
                                        {isEditing && <div className='ms-3' onClick={() => { setTypeModal("pricetable"); setLabelModal("Add Price");setModal(!modal) }} style={{ cursor: "pointer", fontSize: '12px' }}><i className="fa-solid fa-pen"></i></div>}
                                    </div>

                                </div>
                                <div className='mt-5' style={{ backgroundColor: "rgb(245, 245, 245)", padding: "22px", borderRadius: "10px" }}>
                                    <div className='mb-3' style={{ fontSize: "14px" }}>
                                        How many reasons to choose 68M Holidays? Endless!
                                    </div>
                                    <hr className='my-2' />
                                    <div className='row mt-2'>
                                        <div className='col-5 d-flex flex-column row-gap-3'>
                                            <div>
                                                <div className='h5 m-0 p-0'>
                                                    6,78,347
                                                </div>
                                                <div style={{ fontSize: "12px" }}>
                                                    Happy guests
                                                </div>
                                            </div>
                                            <div>
                                                <div className='m-0 p-0 h5'>
                                                    35+
                                                </div>
                                                <div style={{ fontSize: "12px" }}>
                                                    Years of experience
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-7 d-flex flex-column row-gap-3'>
                                            <div>
                                                <div className='h5 m-0 p-0'>
                                                    49,729
                                                </div>
                                                <div style={{ fontSize: "12px" }}>
                                                    Number of success stories
                                                </div>
                                            </div>
                                            <div>
                                                <div className='m-0 p-0 h5'>
                                                    500+
                                                </div>
                                                <div style={{ fontSize: "12px" }}>
                                                    Team members working to ensure you have the best holiday
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <div>
                                        Tour includes
                                    </div>
                                    <div className='d-flex column-gap-4'>
                                        {isEditing ? tourIncludes.map((el, i) => (
                                            <div key={el.label} onClick={() => { handleTourInclude(el.label) }} >
                                                <div key={el.label + "-" + i} className={`rounded-circle d-flex justify-content-center align-items-center ${!el.provided && "provided"}`} style={{ background: "linear-gradient(180deg,#A6A6A6 0%,rgba(166,166,166,0) 100%)", width: "40px", height: "40px", cursor: "pointer" }}>
                                                    {el.svg}
                                                </div>

                                            </div>
                                        )) : tourIncludes.map(el => (
                                            el.provided &&
                                            <div key={el.label}>
                                                <div className={`rounded-circle d-flex justify-content-center align-items-center ${!el.provided && "provided"}`} style={{ background: "linear-gradient(180deg,#A6A6A6 0%,rgba(166,166,166,0) 100%)", width: "40px", height: "40px" }}>
                                                    {el.svg}
                                                </div>

                                            </div>))}

                                    </div>
                                    <div>
                                        <div className=' d-flex justify-content-between mt-3' style={{ fontSize: "14px" }}>
                                            <div className='fw-semibold'>
                                                Key Highlights
                                            </div>
                                            <div onClick={() => { setTypeModal("keyhighlights"); setModal(true) }} style={{ fontSize: "12px", cursor: "pointer", color: "blue", textDecoration: "underline" }}>
                                                View All
                                            </div>
                                        </div>
                                        <div className='keyHighlights' style={{ overflow: "hidden", maxHeight: "100px", overflowY: 'hidden' }}>
                                            <ul className='list-unstyled'>
                                                {keyHighlights.map(el => <li className='listItem'>{el}</li>)}
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-lg-8 col-sm-12 p-0'>
                                <div onClick={() => isEditing && imgRef.current.click()} className={`w-100 d-flex ${isEditing && "isEditing"}`} style={{ height: "380px", borderRadius: "10px" }}>
                                    <input onChange={(e) => { uploadFile(e) }} ref={imgRef} accept="image/*" type="file" style={{ display: "none" }} />
                                    <img style={{ borderRadius: "10px", objectFit: "cover" }} width={"100%"} height={"100%"} src={image} />
                                </div>

                            </div>
                        </div>

                        <div className='d-lg-none d--block d-lg-none'>
                            <div className='mt-5' style={{ backgroundColor: "rgb(245, 245, 245)", padding: "22px", borderRadius: "10px" }}>
                                <div className='mb-3' style={{ fontSize: "14px" }}>
                                    How many reasons to choose 68M Holidays? Endless!
                                </div>
                                <hr className='my-2' />
                                <div className='row mt-2'>
                                    <div className='col-5 d-flex flex-column row-gap-3'>
                                        <div>
                                            <div className='h5 m-0 p-0'>
                                                6,78,347
                                            </div>
                                            <div style={{ fontSize: "12px" }}>
                                                Happy guests
                                            </div>
                                        </div>
                                        <div>
                                            <div className='m-0 p-0 h5'>
                                                35+
                                            </div>
                                            <div style={{ fontSize: "12px" }}>
                                                Years of experience
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-7 d-flex flex-column row-gap-3'>
                                        <div>
                                            <div className='h5 m-0 p-0'>
                                                49,729
                                            </div>
                                            <div style={{ fontSize: "12px" }}>
                                                Number of success stories
                                            </div>
                                        </div>
                                        <div>
                                            <div className='m-0 p-0 h5'>
                                                500+
                                            </div>
                                            <div style={{ fontSize: "12px" }}>
                                                Team members working to ensure you have the best holiday
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-2'>
                                <div>
                                    Tour includes
                                </div>
                                <div className='d-flex column-gap-4'>
                                    {isEditing ? tourIncludes.map((el, i) => (
                                        <div key={el.label} onClick={() => { handleTourInclude(el.label) }} >
                                            <div key={el.label + "-" + i} className={`rounded-circle d-flex justify-content-center align-items-center ${!el.provided && "provided"}`} style={{ background: "linear-gradient(180deg,#A6A6A6 0%,rgba(166,166,166,0) 100%)", width: "40px", height: "40px", cursor: "pointer" }}>
                                                {el.svg}
                                            </div>

                                        </div>
                                    )) : tourIncludes.map(el => (
                                        el.provided &&
                                        <div key={el.label}>
                                            <div className={`rounded-circle d-flex justify-content-center align-items-center ${!el.provided && "provided"}`} style={{ background: "linear-gradient(180deg,#A6A6A6 0%,rgba(166,166,166,0) 100%)", width: "40px", height: "40px" }}>
                                                {el.svg}
                                            </div>

                                        </div>))}

                                </div>
                                <div>
                                    <div className='d-flex justify-content-between mt-3' style={{ fontSize: "14px" }}>
                                        <div className='fw-semibold'>
                                            Key Highlights
                                        </div>
                                        <div onClick={() => { setTypeModal("keyhighlights"); setModal(true) }} style={{ fontSize: "12px", cursor: "pointer", color: "blue", textDecoration: "underline" }}>
                                            View All
                                        </div>
                                    </div>
                                    <div className='keyHighlights' style={{ overflow: "hidden", maxHeight: "100px", overflowY: 'hidden' }}>
                                        <ul className='list-unstyled'>
                                            {keyHighlights.map(el => <li className='listItem'>{el}</li>)}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 position-fixed bottom-0 bg-blue-600 w-100 left-0 z-5 text-white d-flex'>
                                    <div className='w-100'>

                                    
                                    <div className='d-flex justify-content-end align-items-center' style={{ fontWeight: "500", fontSize: "12px", color: "green" }}>
                                        SUPER DEAL PRICE
                                    </div>
                                    <div className='d-flex justify-content-end align-items-center'>
                                        <span className='h-100 me-2' style={{ fontWeight: "400", fontSize: "12px" }}>Starts From</span><h4 className='h4 d-flex p-0 m-0 h-100 justify-content-end align-items-center'>₹ {pricing.filter(el => el.roomType === "Twin Sharing")[0]?.price}</h4>
                                    </div>
                                    <div className='d-flex justify-content-end' style={{ fontWeight: "300", fontSize: "9px" }}>
                                        per person on twin sharing
                                    </div>
                                    {/* <div className='d-flex justify-content-end'>
                                        
                                        from ₹2,615/month
                                    </div> */}
                                    </div>
                                    <div className=''>
                                      <div className='d-flex col-5 w-100  flex-column justify-content-center align-items-center'>
                                    <div className=' text-black d-flex justify-content-center align-items-center' style={{ height: "45px", backgroundColor: "rgb(255, 216, 0)", appearance: "button", borderRadius: "5px", fontFamily: "Muli, sans-serif", fontSize: "14px", cursor: "pointer",width:"200px" }}>
                                        Dates & Prices
                                    </div>
                                    <div className='d-flex w-100 justify-content-center align-items-center'>
                                        <div className='w-100 text-black d-flex justify-content-center align-items-center' onClick={() => { setTypeModal("pricetable"); setModal(!modal) }} style={{ height: "25px!important", width: "150px!important", fontWeight: "400", margin: "10px 0 10px 0", backgroundColor: "rgb(202, 206, 220)", appearance: "button", borderRadius: "5px", fontFamily: "Muli, sans-serif", fontSize: "10px", cursor: "pointer" }}>
                                            View Pricing Table
                                        </div>
                                        {isEditing && <div className='ms-3' onClick={() => { setTypeModal("pricetable"); setModal(!modal) }} style={{ cursor: "pointer", fontSize: '12px' }}><i className="fa-solid fa-pen"></i></div>}
                                    </div>
                                    </div>

                                </div>
                                </div>
                                
                              
                        </div>
                        {/* Select Departur Date& Select Guests and Rooms */}
                        
                        <div>
                            <div className='row'>
                                <div className='mt-5 col-8'>
                                    Select Departure dates & add guest to book your tour
                                </div>
                            </div>
                            {/* TODO ROOMS AND DEPARTUR DATE */}
                        </div>
                    </div>
                    <div className='bg-white secondC'>
                        <div className='container'>
                            <div className='row col-lg-8 col-sm-12'>
                                <div className='itinerary' id="itinerary">
                                    <div>
                                        <h4>
                                            Itinerary <span style={{ fontSize: "15px", color: "GrayText", fontWeight: "400", fontStyle: "italic" }}>(Day Wise)</span>
                                        </h4>
                                    </div>
                                    <div>

                                        {Array.from({ length: days }, (value, index) => index).map(i => {

                                            return (<div className='accordion'>
                                                <div className='left-i'>
                                                    <div></div>
                                                </div>
                                                <div className={`right-i ${i == days - 1 && "last"}`}>
                                                    <div className='top-right-i accordionTab d-flex align-items-center justify-content-between'>
                                                        <div>
                                                            <div className='day-date' style={{ fontSize: "12px", fontWeight: "300" }}>
                                                                Day {i + 1} / {addDate(i)}
                                                            </div>
                                                            {indIte == i && <div className='d-flex align-items-center column-gap-2'><input value={inputPlaces} onChange={(e) => setInputPlaces(e.target.value)} /><div className='rounded-circle d-flex justify-content-center align-items-center bg-green-300' style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={() => addIPlaces()}>+</div></div>}
                                                            <div className='location-i d-flex column-gap-2'>
                                                                {indIte != i && <>{itinerary[i]?.places?.map((pl, ind) => (<div className='d-flex align-items-center column-gap-1'><div>{pl}</div>{(itinerary[i]?.places.length != 1 && itinerary[i]?.places.length - 1 != ind && itinerary[i]?.places.length > ind) && "-----"}</div>)) || "Add destination"} {itinerary[i]?.nights && `(${itinerary[i]?.nights} Night${itinerary[i]?.nights > 1 ? "s" : ""})`}  </>}

                                                                {indIte == i && <div className='d-flex column-gap-2 mt-3'>{IPlaces?.map((pl, ind) => (<div className='d-flex align-items-center column-gap-1'><div className='d-flex'>{pl} <div className='ms-2 rounded-circle bg-red-300 d-flex justify-content-center align-items-center mt-1' style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={() => removeIPlaces(ind)}>-</div></div>{(IPlaces.length != 1 && IPlaces.length - 1 != ind && IPlaces.length > ind) && "-----"}</div>)) || "Add destination"} {indIte != i && (<>{itinerary[i]?.nights && `(${itinerary[i]?.nights} Night)`}</>)}{indIte == i && (<>{<>(<input onChange={(e) => setINights(e.target.value)} value={INights} className=' d-flex text-center' style={{ width: "50px" }} /> Night{INights > 1 && "s"})</>}</>)} </div>}
                                                            </div>
                                                        </div>
                                                        <div className='d-flex column-gap-3 align-items-center'>
                                                            {isEditing && <div className='ms-3' onClick={() => { editItinerary(i) }} style={{ cursor: "pointer" }}><i className="fa-solid fa-pen"></i></div>}
                                                            <div onClick={(e) => { handleAccordion(e, i) }} className='accordionBtn d-flex justify-content-center align-items-center rounded-circle' style={{ width: "30px", cursor: "pointer", height: "30px", background: "#CACEDC" }}>
                                                                <i className='accordiontoggle fa-solid fa-plus'></i>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='accordionContent h-100' id={`accordionContent-${i}`}>
                                                        {!(indIte == i) &&
                                                            <p dangerouslySetInnerHTML={{ __html: itinerary[i]?.decription }} />
                                                        }
                                                        {indIte == i && (<Textarea className='w-100' style={{ border: "none", boxShadow: "none", outline: "none" }} value={description} key={i} row={1} onChange={(e) => { setDescription(e.target.value); resizeTextArea(e) }} />)}
                                                        <div className='d-flex p-3 column-gap-2'>
                                                            {indIte == i && <div className={`rounded-circle bg-green-400 d-flex justify-content-center align-items-center ${!isSight && "provided"}`} onClick={() => { setIsSight(!isSight) }} style={{ width: "30px", height: "30px", cursor: "pointer" }}>S</div>}
                                                            {indIte == i && <div className={`rounded-circle bg-green-400 d-flex justify-content-center align-items-center ${!stay && "provided"}`} onClick={() => { setStay(!stay) }} style={{ width: "30px", height: "30px", cursor: "pointer" }}>H</div>}
                                                            {indIte == i && <div className={`rounded-circle bg-green-400 d-flex justify-content-center align-items-center ${!breakfast && "provided"}`} onClick={() => { setBreakFast(!breakfast) }} style={{ width: "30px", height: "30px", cursor: "pointer" }}>B</div>}
                                                            {indIte == i && <div className={`rounded-circle bg-green-400 d-flex justify-content-center align-items-center ${!lunch && "provided"}`} onClick={() => { setLuch(!lunch) }} style={{ width: "30px", height: "30px", cursor: "pointer" }}>L</div>}
                                                            {indIte == i && <div className={`rounded-circle bg-green-400 d-flex justify-content-center align-items-center ${!dinner && "provided"}`} onClick={() => { setdinner(!dinner) }} style={{ width: "30px", height: "30px", cursor: "pointer" }}>D</div>}
                                                            {indIte == i && <div className={`rounded-circle bg-green-400 d-flex justify-content-center align-items-center ${!snacks && "provided"}`} onClick={() => { setSnacks(!snacks) }} style={{ width: "30px", height: "30px", cursor: "pointer" }}>T</div>}
                                                        </div>
                                                        {((indIte != i && itinerary[i]?.sightseeing) || (indIte == i && isSight)) && <div className='sightSeeing p-3 rounded-3' style={{ width: "55%", backgroundColor: "#F5F5F5" }}>
                                                            <div className='d-flex align-items-center column-gap-2'><svg _ngcontent-veenaworld-c143="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="head-icon" ><g _ngcontent-veenaworld-c143="" clipPath="url(#clip0_10289_7842)"><path _ngcontent-veenaworld-c143="" d="M0.63998 2.56001L5.27998 1.76001L5.43998 14.08L0.47998 14.72L0.63998 2.56001Z" fill="#FFE867"></path><ellipse _ngcontent-veenaworld-c143="" cx="2.23998" cy="10.24" rx="0.64" ry="0.64" fill="white"></ellipse><ellipse _ngcontent-veenaworld-c143="" cx="13.76" cy="13.44" rx="0.64" ry="0.64" fill="#FFE867"></ellipse><path _ngcontent-veenaworld-c143="" d="M15.7219 2.75831L14.8027 2.63365C14.6269 2.60969 14.465 2.73299 14.4412 2.90883C14.4174 3.08467 14.5405 3.24653 14.7164 3.27037L15.3575 3.35734V14.9969L10.8914 14.3786V10.2228C11.0182 10.2456 11.1738 10.2846 11.3352 10.3517C11.8417 10.562 12.1625 10.9434 12.2886 11.4852C12.4141 12.0238 12.599 12.4775 12.8389 12.8382C12.776 12.9687 12.7407 13.1148 12.7407 13.2691C12.7407 13.8179 13.1871 14.2643 13.7359 14.2643C14.2846 14.2643 14.731 13.8179 14.731 13.2691C14.731 12.7204 14.2846 12.274 13.7359 12.274C13.5817 12.274 13.4356 12.3092 13.3052 12.3721C13.1413 12.0924 13.0081 11.7414 12.9144 11.3394C12.7411 10.5951 12.2803 10.0483 11.5817 9.75823C11.3221 9.65044 11.0749 9.5981 10.8915 9.57272V2.73826L11.8565 2.87185C12.0323 2.89608 12.1945 2.77344 12.2188 2.59767C12.2431 2.42193 12.1204 2.25968 11.9446 2.23539L10.8596 2.08516V0.634514C10.8596 0.45707 10.7157 0.313232 10.5383 0.313232H5.42965C5.25221 0.313232 5.10837 0.45707 5.10837 0.634514V1.54027L0.283145 2.11716C0.121605 2.13647 0 2.2735 0 2.43616V14.7252C0 14.9147 0.170986 15.0667 0.359417 15.0442L5.46798 14.4334C5.62952 14.4141 5.75113 14.277 5.75113 14.1144V13.2448H10.2489V14.6584C10.2489 14.8189 10.3672 14.9547 10.5261 14.9767L15.6347 15.6839C15.8249 15.7103 16 15.5576 16 15.3657V3.0767C16 2.9159 15.8812 2.7799 15.7219 2.75831ZM14.0884 13.2691C14.0884 13.4635 13.9303 13.6217 13.7358 13.6217C13.5414 13.6217 13.3832 13.4636 13.3832 13.2691C13.3832 13.0747 13.5414 12.9165 13.7358 12.9165C13.9303 12.9165 14.0884 13.0747 14.0884 13.2691ZM10.2169 0.955795V8.41032C9.17997 8.34231 8.9491 7.57663 8.709 6.36585C8.58627 5.7469 8.47036 5.16227 8.13674 4.76022C7.9084 4.48507 7.60447 4.33172 7.25778 4.31678C6.71115 4.29317 6.14836 4.61239 5.75113 4.90563V1.82537C5.75113 1.82409 5.75093 1.82284 5.75093 1.82155V0.955795H10.2169ZM0.642563 14.3632V2.72133L5.10837 2.18739V7.36921C4.81437 8.65961 3.90476 9.29883 3.09516 9.61497C2.92035 9.3281 2.60453 9.13616 2.24473 9.13616C1.69598 9.13616 1.24956 9.58258 1.24956 10.1313C1.24956 10.6801 1.69598 11.1265 2.24473 11.1265C2.75341 11.1265 3.17391 10.7428 3.2326 10.2496C3.80461 10.0379 4.55709 9.63656 5.10837 8.89466V12.9235C5.10837 12.9249 5.10856 12.9262 5.10856 12.9276V13.8292L0.642563 14.3632ZM2.59733 10.1313C2.59733 10.3257 2.43917 10.4839 2.24473 10.4839C2.05029 10.4839 1.89212 10.3257 1.89212 10.1313C1.89212 9.93686 2.05029 9.77869 2.24473 9.77869C2.43917 9.77869 2.59733 9.93689 2.59733 10.1313ZM5.75113 12.6022V5.73971C6.04841 5.46135 6.71854 4.93702 7.23008 4.9587C7.39734 4.96593 7.52833 5.03321 7.64222 5.17049C7.87178 5.44711 7.97227 5.95406 8.07868 6.4908C8.19743 7.0896 8.32019 7.70881 8.64629 8.20377C8.99363 8.731 9.52133 9.01584 10.2169 9.0535V12.6022H5.75113V12.6022Z" fill="#212221"></path><path _ngcontent-veenaworld-c143="" d="M13.3298 3.06981C13.5073 3.06981 13.6511 2.92597 13.6511 2.74853C13.6511 2.57109 13.5073 2.42725 13.3298 2.42725C13.1524 2.42725 13.0085 2.57109 13.0085 2.74853C13.0085 2.92597 13.1524 3.06981 13.3298 3.06981Z" fill="#212221"></path></g><defs _ngcontent-veenaworld-c143=""><clipPath _ngcontent-veenaworld-c143="" id="clip0_10289_7842"><rect _ngcontent-veenaworld-c143="" width="16" height="16" fill="white"></rect></clipPath></defs></svg>
                                                                <div style={{ fontSize: "14px" }}>Today's Sight Seeing</div>
                                                            </div>

                                                            <div className='mt-3'>
                                                                {indIte == i && (<div className='d-flex align-items-center column-gap-2'><input value={sightSInput} onChange={(e) => setSightInput(e.target.value)} /><div className='rounded-circle p-2 d-flex justify-content-center align-items-center bg-green-200 ' style={{ height: "20px", width: "20px", fontSize: "20px", cursor: "pointer" }} onClick={() => { updateSightSeeing() }}>+</div> </div>)}
                                                                {!(indIte == i) && itinerary[i]?.sightseeingDetails?.map(sd => <div className='listItem'>
                                                                    {sd}
                                                                </div>)}
                                                                {(indIte == i) && sightSeeing?.map((sd, sind) => <div className='listItem d-flex mt-2 column-gap-2'>
                                                                    {sd} <div className='rounded-circle d-flex justify-content-center align-items-center bg-red-400' onClick={() => { deleteSightSeeing(sind) }} style={{ width: "20px", height: "20px", cursor: "pointer" }} >-</div>
                                                                </div>)}
                                                            </div>
                                                        </div>}
                                                        {((indIte != i && (itinerary[i]?.dinner || itinerary[i]?.lunch || itinerary[i]?.breakFast || itinerary[i]?.Stay || itinerary[i]?.snack)) || (indIte == i && (dinner || lunch || breakfast || stay || snacks))) && (<div className='mt-4 msb p-3 rounded-3' style={{ width: "55%", backgroundColor: "#F5F5F5" }}>
                                                            {((indIte != i && itinerary[i]?.Stay) || (indIte == i && stay)) && <div className='stay mb-3 d-flex align-items-center column-gap-2'><img width="20" height="20" src="https://img.icons8.com/ios/50/bed.png" alt="bed" />
                                                                <div style={{ fontSize: "14px" }}>Night Stay in {indIte != i && itinerary[i].nightStayLocation}{indIte == i && <input value={sLocation} onChange={(e) => setStayLocation(e.target.value)} />}</div>
                                                            </div>}
                                                            {((indIte != i && (itinerary[i]?.dinner || itinerary[i]?.lunch || itinerary[i]?.breakFast)) || (indIte == i && (breakfast || lunch || dinner))) && (<div className='d-flex mb-3 meals align-items-center column-gap-2'><img width={20} height={20} src={'/assets/meals.png'} />
                                                                <div style={{ fontSize: "14px" }}>{(breakfast ? "Breakfast" : "") + (((breakfast && lunch) || (breakfast && dinner)) ? "," : "") + (lunch ? "Lunch" : "") + (lunch && dinner ? "," : "") + (dinner ? "Dinner" : "")}</div>
                                                            </div>)}

                                                            {snacks && (<div className='d-flex snacks align-items-center column-gap-2'><img width={20} height={20} src={'/assets/tea.png'} />
                                                                <div style={{ fontSize: "14px" }}>{!(indIte == i) && itinerary[i].snackDetail}{indIte == i && <input value={snackDesc} onChange={(e) => { setSnackDesc(e.target.value) }} />}</div>
                                                            </div>)}

                                                        </div>)}
                                                    </div>
                                                </div>
                                            </div>)
                                        })}

                                    </div>
                                </div>
                                <div className="tourDetails">
                                    <div className='my-3'>
                                        Tour Details
                                        <div style={{ fontStyle: "italic", color: "GrayText", fontSize: "16px", fontWeight: "300" }}>
                                            Best facilities with no added cost.
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex'>
                                            <div className={`tdTab ${active == "fDetails" && "active"}`} onClick={(e) => { handleTD("fDetails", e) }}>
                                                Flight Details
                                            </div>
                                            <div className={`tdTab ${active == "aDetails" && "active"}`} onClick={(e) => { handleTD("aDetails", e) }}>
                                                Accomodation Details
                                            </div>
                                            <div className={`tdTab ${active == "rdDetails" && "active"}`} onClick={(e) => { handleTD("rdDetails", e) }}>
                                                Reporting & Dropping
                                            </div>
                                        </div>
                                        <div className='tdContent d-flex aling-item'>
                                            {tourDetails[0]?.flightDetails ? (<></>) : (<div className='fDetails show'>
                                                Processing the best for you!

                                                We are in the process of booking the flights for this tour. We will update it here, as we are done.

                                                Post Booking, you will be notified through your contact details about all tour related updates.
                                            </div>)}
                                            <div className='aDetails'>
                                                <div className='d-flex'>
                                                    <div className='col-4 py-2 text-center'>
                                                        City - Country
                                                    </div>
                                                    <div className='col-4 py-2 text-center'>
                                                        Hotel
                                                    </div>
                                                    <div className='col-4 py-2 text-center'>
                                                        Check In - Check Out
                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className='col-4 py-2 text-center'>
                                                        Cochin - India
                                                    </div>
                                                    <div className='col-4 py-2 '>
                                                        Starlit Suites/ Keys Select Hotel,Kochi Kerala/ TBA /or similar
                                                    </div>
                                                    <div className='col-4 py-2 text-center'>
                                                        10 Mar - 11 Mar
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#F8F8F8" }}>
                                                    <div className='col-4 py-2 text-center'>
                                                        Cochin - India
                                                    </div>
                                                    <div className='col-4 py-2 '>
                                                        Starlit Suites/ Keys Select Hotel,Kochi Kerala/ TBA /or similar
                                                    </div>
                                                    <div className='col-4 py-2 text-center'>
                                                        10 Mar - 11 Mar
                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className='col-4 py-2 text-center'>
                                                        Cochin - India
                                                    </div>
                                                    <div className='col-4 py-2 '>
                                                        Starlit Suites/ Keys Select Hotel,Kochi Kerala/ TBA /or similar
                                                    </div>
                                                    <div className='col-4 py-2 text-center'>
                                                        10 Mar - 11 Mar
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='rdDetails'>
                                                <div>
                                                    <div className='d-flex'>
                                                        <div className='col-3 rdLeft'>
                                                            Guest Type
                                                        </div>
                                                        <div className='col-9 rdRight'>
                                                            Scheduled Tour Guests
                                                        </div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className='col-3 rdLeft'>
                                                            Reporting Point
                                                        </div>
                                                        <div className='col-9 rdRight'>
                                                            Cochin Airport
                                                        </div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className='col-3 rdLeft'>
                                                            Dropping Point
                                                        </div>
                                                        <div className='col-9 rdRight'>
                                                            Cochin Airport
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ borderTop: "1px solid #BEBEBE" }}>
                                                    <div className='d-flex'>
                                                        <div className='col-3 rdLeft'>
                                                            Guest Type
                                                        </div>
                                                        <div className='col-9 rdRight'>
                                                            Scheduled Tour Guests
                                                        </div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className='col-3 rdLeft'>
                                                            Reporting Point
                                                        </div>
                                                        <div className='col-9 rdRight'>
                                                            Cochin Airport
                                                        </div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className='col-3 rdLeft' style={{ borderRadius: "0 0 0 10px" }}>
                                                            Dropping Point
                                                        </div>
                                                        <div className='col-9 rdRight'>
                                                            Cochin Airport
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {modal && (
                <div className='w-100 h-100 position-fixed d-flex justify-content-center align-items-center modal top-0' style={{ left: 0, display: "block", backgroundColor: "rgb(0,0,0,0.55)" }}>
                    <OutsideAlerter setModal={setModal}>
                        <div className={`rounded-4 bg-white  modalA ${modal && "show"}`} style={{  boxShadow: "-1px 9px 50px 14px rgba(0,0,0,0.2)" }}>
                            <div style={{fontWeight:"300"}} className='d-flex justify-content-between px-3 py-2'>
                               <div>
                                {labelModal}
                               </div>
                               <div style={{cursor:"pointer"}} onClick={()=>{setModal(false)}}>
                                x
                            </div> 
                            </div>
                            <hr className='p-0 m-0'/>
                            <div className='p-2'>

                            
                            {typemodal === "destinations" && <AddDestination inputValue={inputValue} plcaeInputValue={placeinputValue} setPlaceInputValue={setPlaceInputValue} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setAddC={setAddC} setPlaces={setPlaces} places={places} setInputValue={setInputValue} destinations={destinations} groupBy={groupBy} nights={nights} setNights={setNights} handleCountry={handleCountry} removeCountry={removeCountry} handlePlace={handlePlace} removePlace={removePlace} />}
                            {typemodal === "pricetable" && <AddPricingData roomType={roomType} setRoomType={setRoomType} isEditing={isEditing} numberValidation={numberValidation} price={price} setPrice={setPrice} pricing={pricing} setPricing={setPricing} />}
                            {typemodal === "keyhighlights" && <KeyHighLights keyHighlights={keyHighlights} setKeyHighlights={setKeyHighlights} isEditing={isEditing} keyHighlight={keyHighlight} setKeyHighlight={setKeyHighlight} />}
                            </div>
                        </div>
                    </OutsideAlerter>
                </div>
            )}
            {(role == process.env.NEXT_PUBLIC_ADMIN || role == process.env.NEXT_PUBLIC_SUPER_ADMIN) && (<>{isAuthS && (<div className='d-flex editIcon justify-content-center rounded-circle text-white align-items-center position-fixed' onClick={() => { !isEditingS ? handlEdit() : handleSave() }} style={{ right: 100, bottom: 50, cursor: "pointer", background: "#0582BE", width: "50px", height: "50px" }}>{isEditing ? (<i className="fas fa-save"></i>) : (<i className="fas fa-edit"></i>)}</div>)}</>)}
            {(role == process.env.NEXT_PUBLIC_SUPER_ADMIN) && (<>{isAuthS && (<div className='d-flex editIcon justify-content-center rounded-circle text-white align-items-center position-fixed' onClick={() => { handlePublish() }} style={{ right: 160, bottom: 50, cursor: "pointer", background: "#0582BE", width: "50px", height: "50px" }}>{(<div className="">P</div>)}</div>)}</>)}
            {(role == process.env.NEXT_PUBLIC_SUPER_ADMIN) && (<>{isAuthS && (<div className='d-flex editIcon justify-content-center rounded-circle text-white align-items-center position-fixed' onClick={() => { handleDelete() }} style={{ right: 220, bottom: 50, cursor: "pointer", background: "#0582BE", width: "50px", height: "50px" }}>{(<div>D</div>)}</div>)}</>)}
        </>)
    )
}

export default Package



const getPackage = async (code) => {
    const packageD = (await fetch(`/api/package/getPackage?code=${code}`, { method: "GET" })).json()

    return packageD
}