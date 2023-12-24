"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { setIsEditing, setPackageName } from '../../store/slices/packageSlice'
import { useAppDispatch, useAppSelector } from '../../store/stores'
import OutsideAlerter from '../comonents/submenu'
import Skeleton from 'react-loading-skeleton'


const Pakcages = () => {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const roleS = useAppSelector((state) => state.auth.role)
    const [role, setRole] = useState()
    const [prf, setPrf] = useState()
    const [tdf, setTdf] = useState()
    const [modal, setModal] = useState(false)
    const [packagName, setPackageName] = useState()
    const [packageId, setPackageId] = useState()
    const [adultCount, setAdultCount] = useState(0)
    const [childCount, setChildCount] = useState(0)
    const [infantCount, setInfantCount] = useState(0)
    const [pricingtTable, setPricingTable] = useState()
    const [loading, setLoading] = useState(true)
    const [togglePRF, setTogglePRF] = useState(false)
    const [toggleTDF, setToggleTDF] = useState(false)
    const [type, setType] = useState()
    const [toggleGuest, setToggleGuest] = useState(false)

    useEffect(() => {
        setRole(roleS)
    }, [roleS])


    const [minDays, setMinDays] = useState()
    const [maxDays, setMaxDays] = useState()

    const handleQuickQuote = (id, name) => {
        setPackageId(id)
        setPackageName(name)
        console.log(name)
        setType("qQuote")
        setModal(true)
    }

    const Filter = async () => {
        const packages = (await fetch("/api/package/getPackages?user=all", { method: "GET" })).json()

    }

    const formatter = new Intl.NumberFormat('en-IN', { style: "currency", currency: "INR", maximumSignificantDigits: 3 })
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

    const [packages, setPackages] = useState([])

    const addPackage = async () => {
        const res = await (await fetch("/api/package/addPackage", { method: "POST" })).json()
        const code = res.code
        dispatch(setIsEditing(false))
        router.push(`/package/${code}`)
    }

    useEffect(() => {
        async function getPacka() {
            const res = await getPackages()
            setPackages(res)
            setLoading(false)

        }
        getPacka()
    }, [])
    return (
        <>
            <div className='d-flex'>
                {console.log(role, "ROLE")}
                {(role === process.env.NEXT_PUBLIC_ADMIN || role === process.env.NEXT_PUBLIC_SUPER_ADMIN) && (<div className='d-flex'>
                    <div className='p-2 bg-black text-white' style={{minWidth:"170px"}}>
                        <div className='rounded-2  p-2 mt-2' onClick={() => addPackage()} style={{ cursor: "pointer", position: "relative", border: "1px solid grey", fontSize: "12px", fontWeight: "600", zIndex: "2" }}>
                            <div className='d-flex'>
                            <div className='me-3'>
                            <i class="fa-solid fa-plus"></i>
                            </div>
                            <div>
                                Package
                            </div>
                            </div>
                        </div>
                        <div className='rounded-2  p-2 mt-2' onClick={() => addPackage()} style={{ cursor: "pointer", position: "relative", border: "1px solid grey", fontSize: "12px", fontWeight: "600", zIndex: "2" }}>
                            <div className='d-flex'>
                            <div className='me-3'>
                            <i class="fa-solid fa-plus"></i>
                            </div>
                            <div>
                                User
                            </div>
                            </div>
                        </div>
                        <div className='rounded-2 p-2 mt-2' onClick={() => addPackage()} style={{ cursor: "pointer", position: "relative", border: "1px solid grey", fontSize: "12px", fontWeight: "600", zIndex: "2" }}>
                            Check User Enquiries
                        </div>
                    </div>
                </div>)}
                <div className='mx-auto'>
                    <div className='container mt-4 p-0 position-relative rounded-3 mx-auto bg-white'>

                        <div className='d-flex'>

                            <div className='h-100 bg-black' style={{ width: "200px" }}>
                            </div>
                            <div className='col-5 p-3 pt-5 position-relative'>
                                <h5 style={{ fontWeight: "700" }}>Indian Tour Packages</h5>
                                <div className={`seoContent position-relative showpc ${show && "show"}`}>
                                    <div className='position-relative'>
                                        <p className='topSectionDesc'>
                                            The ancient spark of the spiritual land, with ethnic evolutionary life, completely different from anywhere on the globe, is the land where your soul awaits to transcend!
                                        </p>
                                        <p className='topSectionDesc'>India is the land of vibrant colours, life & culture. The diversity of the country is portrayed in every human, land and also its cuisine. It is aptly said that, everything we really wanted was always there right in front of our eyes and we failed to see it. That is exactly the case for most travelers in India. We at, Veena World, handcraft our India travel packages with most remarkable locations that lie in every corner of India. And if you are looking for tips on where to start, explore our India tour packages for best options.</p>
                                        <p className='topSectionDesc'>Traverse through the country and know the land’s true and raw nature; be surprised with the inherent, divine beauty of the realm. With the perfect match for your choices among the holiday packages in India, breathe the beauty of untapped incredible India! India’s lavish natural beauties are dramatically the ones which carved its history. A country with ample of UNESCO world heritage sites, eloquent coastlines & beaches, royal palaces, ancient caves and temples, glaring deserts, the land of Himalayas and the list goes on. For a country so huge and with so much to offer we have passion in abundance and unrivalled knowledge to present you the perfect Indian vacation.</p>



                                    </div>
                                    <div className='textOpacity'></div>
                                </div>

                                <div style={{ cursor: "pointer" }} onClick={() => setShow(!show)} className='mt-3 text-blue-600 text-decoration-underline'>
                                    Read more
                                </div>
                            </div>

                            <div className='col-7 p-0 position-relative topScetionImage'>
                                <div className="whiteOverlay" />
                                <div className='h-100 p-0 d-flex justify-content-center align-items-center' style={{ zIndex: 2, position: "relative" }}>
                                    <div className={`mx-auto tableContent ${show && "show"}`} style={{ width: "80%", paddingLeft: "1em" }}>
                                        <div className='mb-2' style={{ fontWeight: 500, fontSize: "12px" }}>
                                            India Travel Packages
                                        </div>
                                        <div className='rounded-2 overflow-hidden' style={{ border: "1px solid gray" }}>
                                            <table className='w-100' style={{ fontSize: "12px" }}>
                                                <tbody>
                                                    <tr className='text-white bg-blue-800' >
                                                        <th className='pacTH w-50 paddingd'>
                                                            India Packages
                                                        </th>
                                                        <th className='pacTH w-25 paddingd'>
                                                            Day/Night
                                                        </th>
                                                        <th className='w-25 pacTH paddingd'>
                                                            Price
                                                        </th>
                                                    </tr>
                                                    <tr className='bg-white' >
                                                        <td className='border-right-1 border-bottom-1 w-50 paddingd'>
                                                            India Packages
                                                        </td>
                                                        <td className='border-right-1 border-bottom-1 w-25 paddingd'>
                                                            Day/Night
                                                        </td>
                                                        <td className='w-25 border-bottom-1 paddingd'>
                                                            Price
                                                        </td>
                                                    </tr>
                                                    <tr className='bg-white' >
                                                        <td className='border-right-1 border-bottom-1 w-50 paddingd'>
                                                            India Packages
                                                        </td>
                                                        <td className='border-right-1 border-bottom-1 w-25 paddingd'>
                                                            Day/Night
                                                        </td>
                                                        <td className='w-25 border-bottom-1 paddingd'>
                                                            Price
                                                        </td>
                                                    </tr>
                                                    <tr className='bg-white' >
                                                        <td className='border-right-1 w-50 paddingd'>
                                                            India Packages
                                                        </td>
                                                        <td className='border-right-1 w-25 paddingd'>
                                                            Day/Night
                                                        </td>
                                                        <td className='w-25 paddingd'>
                                                            Price
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <div>
                                            234 India Holiday Packages
                                        </div>
                                        <div>
                                            Showing 1-10 packages from 234 packages
                                        </div>
                                    </div>
                                    <div>
                                        <div className='d-flex ps-2 align-items-center bg-white rounded-2' style={{ width: "200px", height: "30px", border: "1px solid black", cursor: "pointer" }}>
                                            Sort by Deals
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-2'>
                            <div className='searchFilterouter  ps-md-0'>
                                <div className='d-flex flex-column justify-content-center  p-3' style={{ fontSize: "14px" }}>
                                    <div className='d-flex  justify-content-between'>
                                        <div style={{ fontWeight: "600" }}>
                                            Filter Your Tour
                                        </div>
                                        <div onClick={() => { setPrf(); setTdf() }} style={{ color: "darkblue", cursor: "pointer" }}>
                                            Clear All
                                        </div>
                                    </div>
                                    <div className='mt-2 d-flex flex-wrap column-gap-1 row-gap-2 text-gray-500' style={{ fontSize: "12px" }}>
                                        {prf && (<div style={{ cursor: "pointer" }} className='filterPill border p-1 px-2 rounded-pill'>
                                            {prf?.label}

                                        </div>)}
                                        {tdf && (<div style={{ cursor: "pointer" }} className='filterPill border p-1 px-2 rounded-pill'>
                                            {tdf?.label}
                                        </div>)}
                                        {/* {<div style={{cursor:"pointer"}} className='filterPill border p-1 px-2 rounded-pill'>
                                    20 Dec 2023 - 28 Dec 2023
                                </div>} */}
                                    </div>
                                </div>
                                <hr className='p-0 m-0' />
                                <div className='p-3' style={{ fontSize: "14px" }}>
                                    <div onClick={() => setTogglePRF(!togglePRF)} className='d-flex justify-content-between' style={{ cursor: "pointer" }}>
                                        <div style={{ fontWeight: "600" }}>
                                            Price Range
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className={` filterDrop ${togglePRF && "active"}`} >
                                        <div className='d-flex justify-content-center column-gap-1'>
                                            <div style={{ cursor: "pointer" }} onClick={() => setPrf({ "label": "₹0 - ₹60,000", "min": "0", "max": "60000" })} className={`filterBtn  justify-content-center d-flex align-items-center rounded-2 ${prf?.label === "₹0 - ₹60,000" && "active"}`}>
                                                ₹0 - ₹60,000
                                            </div>
                                            <div style={{ cursor: "pointer" }} onClick={() => setPrf({ "label": "₹60,000 - ₹1.2L", "min": "60,000", "max": "120000" })} className={`filterBtn  justify-content-center d-flex align-items-center rounded-2 ${prf?.label === "₹60,000 - ₹1.2L" && "active"}`}>
                                                ₹60,000 - ₹ 1.2L
                                            </div>
                                        </div>
                                        <div className='d-flex mt-2 column-gap-1 justify-content-center'>
                                            <div style={{ cursor: "pointer" }} onClick={() => setPrf({ "label": "₹1.2L - ₹1.8L", "min": "120000", "max": "180000" })} className={`filterBtn  justify-content-center d-flex align-items-center rounded-2 ${prf?.label == "₹1.2L - ₹1.8L" && "active"}`}>
                                                ₹1.2L - ₹1.8L
                                            </div>
                                            <div style={{ cursor: "pointer" }} onClick={() => setPrf({ "label": "₹1.8L & Above", "min": "180000", "max": "Infinite" })} className={`filterBtn  justify-content-center d-flex align-items-center rounded-2 ${prf == "₹1.8L & Above" && "active"}`}>
                                                ₹1.8L & above
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <hr className='p-0 m-0' />
                                <div className='p-3' style={{ fontSize: "14px" }}>
                                    <div onClick={() => setToggleTDF(!toggleTDF)} className='d-flex justify-content-between' style={{ cursor: "pointer" }}>
                                        <div style={{ fontWeight: "600" }}>
                                            Tour Duration
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className={` filterDrop ${toggleTDF && "active"}`} >
                                        <div className='d-flex justify-content-center column-gap-1'>
                                            <div style={{ cursor: "pointer" }} onClick={() => setTdf({ "label": "3 - 15 Days", "min": "3", "max": "15" })} className={`filterBtn  justify-content-center d-flex align-items-center rounded-2 ${tdf?.label === "3 - 15 Days" && "active"}`}>
                                                3 - 15 Days
                                            </div>
                                            <div style={{ cursor: "pointer" }} onClick={() => setTdf({ "label": "15 - 27 Days", "min": "15", "max": "27" })} className={`filterBtn  justify-content-center d-flex align-items-center rounded-2 ${tdf?.label === "15 - 27 Days" && "active"}`}>
                                                15 - 27 Days
                                            </div>
                                        </div>
                                        <div className='d-flex mt-2 column-gap-1 justify-content-center'>
                                            <div style={{ cursor: "pointer" }} onClick={() => setTdf({ "label": "27 - 39 Days", "min": "27", "max": "39" })} className={`filterBtn  justify-content-center d-flex align-items-center rounded-2 ${tdf?.label == "27 - 39 Days" && "active"}`}>
                                                27 - 39 Days
                                            </div>
                                            <div style={{ cursor: "pointer" }} onClick={() => setTdf({ "label": "39 - 50 Days", "min": "39", "max": "50" })} className={`filterBtn  justify-content-center d-flex align-items-center rounded-2 ${prf == "39 - 50 Days" && "active"}`}>
                                                39 - 50 Days
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <hr className='p-0 m-0' />
                            </div>
                            <div className='searchListOuter d-flex flex-column row-gap-4 ps-md-0'>

                                {loading ? (
                                    <>
                                        <div className='searchCard bg-white rounded-3' style={{ width: "100%", boxShadow: "0 0 10px #00000012" }}>
                                            <div className='searchCardHolder'>
                                                <div className='primaryInfo'>
                                                    <div className='imageHolder position-relative ps-1'>
                                                        <div className='imgwrpr'>
                                                            <Skeleton className='w-100 h-100' />
                                                        </div>

                                                    </div>
                                                    <div className='contentHolder position-relative d-flex  justify-content-between pb-3 mt-2'>
                                                        <div className='leftContentHolder d-flex flex-column h-100 justify-content-between'>
                                                            <div className='d-flex flex-column column-gap-2'>
                                                                <div className='h5'>
                                                                    <Skeleton className='w-100' style={{ textDecoration: "none", color: "black" }} />


                                                                </div>
                                                                <div className='d-flex column-gap-4'>

                                                                    <div >
                                                                        <div className={`rounded-circle  `} style={{ width: "40px", height: "40px" }}>
                                                                            <Skeleton className='w-100 rounded-circle h-100' />

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ fontSize: "12px" }}>
                                                                <div className=' '>
                                                                    <div className='  align-items-center'>
                                                                        <div>
                                                                            <Skeleton />
                                                                        </div>
                                                                        <div>
                                                                            <Skeleton />
                                                                        </div>
                                                                    </div>
                                                                    <div className=' '>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <div>
                                                                        <Skeleton />
                                                                    </div>
                                                                </div>

                                                                <div className='d-flex column-gap-3'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <div className='me-2' style={{ width: "20px", height: "20px" }}>
                                                                            <Skeleton />
                                                                        </div>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <div>
                                                                        <Skeleton />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='rightContentHolder'>
                                                            <div className='text-end reightContent'>
                                                                <h4 className='superDeal'>
                                                                    <Skeleton />
                                                                </h4>
                                                                <div className=' justify-content-end column-gap-2' style={{ fontSize: "12px" }}>
                                                                    <div style={{ color: "#9FA1A8" }}>
                                                                        <Skeleton />
                                                                    </div>
                                                                    {/* <div style={{color:"red",fontWeight:"600"}}>
                                             Last 1 Seat
                                         </div> */}
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontSize: "12px", color: "GrayText" }}>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <h4 style={{ fontWeight: "700", fontSize: "20px" }}>
                                                                        <Skeleton />
                                                                    </h4>
                                                                </div>
                                                                <div style={{ fontWeight: "300", fontSize: "10px" }}>
                                                                    <Skeleton />
                                                                </div>
                                                                <div className='  w-100'>
                                                                    <div className='w-100 h-100  row-gap-2 justify-content-center align-items-center flex-column'>
                                                                        <Skeleton style={{ color: "black", textDecoration: "none" }} className='w-100 viewDetails d-flex justify-content-center align-items-center p-3 rounded-3 border h-100' />
                                                                        <div className=' w-100 justify-content-center align-items-center column-gap-3 '>
                                                                            <Skeleton style={{ cursor: "pointer" }} className=' d-flex justify-content-center align-items-center w-100' />


                                                                            <Skeleton style={{ cursor: "pointer" }} className=' d-flex justify-content-center align-items-center w-100' />


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='searchCard bg-white rounded-3' style={{ width: "100%", boxShadow: "0 0 10px #00000012" }}>
                                            <div className='searchCardHolder'>
                                                <div className='primaryInfo'>
                                                    <div className='imageHolder position-relative ps-1'>
                                                        <div className='imgwrpr'>
                                                            <Skeleton className='w-100 h-100' />
                                                        </div>

                                                    </div>
                                                    <div className='contentHolder position-relative d-flex  justify-content-between pb-3 mt-2'>
                                                        <div className='leftContentHolder d-flex flex-column h-100 justify-content-between'>
                                                            <div className='d-flex flex-column column-gap-2'>
                                                                <div className='h5'>
                                                                    <Skeleton className='w-100' style={{ textDecoration: "none", color: "black" }} />


                                                                </div>
                                                                <div className='d-flex column-gap-4'>

                                                                    <div >
                                                                        <div className={`rounded-circle  `} style={{ width: "40px", height: "40px" }}>
                                                                            <Skeleton className='w-100 rounded-circle h-100' />

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ fontSize: "12px" }}>
                                                                <div className=' '>
                                                                    <div className='  align-items-center'>
                                                                        <div>
                                                                            <Skeleton />
                                                                        </div>
                                                                        <div>
                                                                            <Skeleton />
                                                                        </div>
                                                                    </div>
                                                                    <div className=' '>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <div>
                                                                        <Skeleton />
                                                                    </div>
                                                                </div>

                                                                <div className='d-flex column-gap-3'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <div className='me-2' style={{ width: "20px", height: "20px" }}>
                                                                            <Skeleton />
                                                                        </div>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <div>
                                                                        <Skeleton />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='rightContentHolder'>
                                                            <div className='text-end reightContent'>
                                                                <h4 className='superDeal'>
                                                                    <Skeleton />
                                                                </h4>
                                                                <div className=' justify-content-end column-gap-2' style={{ fontSize: "12px" }}>
                                                                    <div style={{ color: "#9FA1A8" }}>
                                                                        <Skeleton />
                                                                    </div>
                                                                    {/* <div style={{color:"red",fontWeight:"600"}}>
                                             Last 1 Seat
                                         </div> */}
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontSize: "12px", color: "GrayText" }}>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <h4 style={{ fontWeight: "700", fontSize: "20px" }}>
                                                                        <Skeleton />
                                                                    </h4>
                                                                </div>
                                                                <div style={{ fontWeight: "300", fontSize: "10px" }}>
                                                                    <Skeleton />
                                                                </div>
                                                                <div className='  w-100'>
                                                                    <div className='w-100 h-100  row-gap-2 justify-content-center align-items-center flex-column'>
                                                                        <Skeleton style={{ color: "black", textDecoration: "none" }} className='w-100 viewDetails d-flex justify-content-center align-items-center p-3 rounded-3 border h-100' />
                                                                        <div className=' w-100 justify-content-center align-items-center column-gap-3 '>
                                                                            <Skeleton style={{ cursor: "pointer" }} className=' d-flex justify-content-center align-items-center w-100' />


                                                                            <Skeleton style={{ cursor: "pointer" }} className=' d-flex justify-content-center align-items-center w-100' />


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='searchCard bg-white rounded-3' style={{ width: "100%", boxShadow: "0 0 10px #00000012" }}>
                                            <div className='searchCardHolder'>
                                                <div className='primaryInfo'>
                                                    <div className='imageHolder position-relative ps-1'>
                                                        <div className='imgwrpr'>
                                                            <Skeleton className='w-100 h-100' />
                                                        </div>

                                                    </div>
                                                    <div className='contentHolder position-relative d-flex  justify-content-between pb-3 mt-2'>
                                                        <div className='leftContentHolder d-flex flex-column h-100 justify-content-between'>
                                                            <div className='d-flex flex-column column-gap-2'>
                                                                <div className='h5'>
                                                                    <Skeleton className='w-100' style={{ textDecoration: "none", color: "black" }} />


                                                                </div>
                                                                <div className='d-flex column-gap-4'>

                                                                    <div >
                                                                        <div className={`rounded-circle  `} style={{ width: "40px", height: "40px" }}>
                                                                            <Skeleton className='w-100 rounded-circle h-100' />

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ fontSize: "12px" }}>
                                                                <div className=' '>
                                                                    <div className='  align-items-center'>
                                                                        <div>
                                                                            <Skeleton />
                                                                        </div>
                                                                        <div>
                                                                            <Skeleton />
                                                                        </div>
                                                                    </div>
                                                                    <div className=' '>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <div>
                                                                        <Skeleton />
                                                                    </div>
                                                                </div>

                                                                <div className='d-flex column-gap-3'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <div className='me-2' style={{ width: "20px", height: "20px" }}>
                                                                            <Skeleton />
                                                                        </div>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <div>
                                                                        <Skeleton />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='rightContentHolder'>
                                                            <div className='text-end reightContent'>
                                                                <h4 className='superDeal'>
                                                                    <Skeleton />
                                                                </h4>
                                                                <div className=' justify-content-end column-gap-2' style={{ fontSize: "12px" }}>
                                                                    <div style={{ color: "#9FA1A8" }}>
                                                                        <Skeleton />
                                                                    </div>
                                                                    {/* <div style={{color:"red",fontWeight:"600"}}>
                                             Last 1 Seat
                                         </div> */}
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontSize: "12px", color: "GrayText" }}>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <h4 style={{ fontWeight: "700", fontSize: "20px" }}>
                                                                        <Skeleton />
                                                                    </h4>
                                                                </div>
                                                                <div style={{ fontWeight: "300", fontSize: "10px" }}>
                                                                    <Skeleton />
                                                                </div>
                                                                <div className='  w-100'>
                                                                    <div className='w-100 h-100  row-gap-2 justify-content-center align-items-center flex-column'>
                                                                        <Skeleton style={{ color: "black", textDecoration: "none" }} className='w-100 viewDetails d-flex justify-content-center align-items-center p-3 rounded-3 border h-100' />
                                                                        <div className=' w-100 justify-content-center align-items-center column-gap-3 '>
                                                                            <Skeleton style={{ cursor: "pointer" }} className=' d-flex justify-content-center align-items-center w-100' />


                                                                            <Skeleton style={{ cursor: "pointer" }} className=' d-flex justify-content-center align-items-center w-100' />


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='searchCard bg-white rounded-3' style={{ width: "100%", boxShadow: "0 0 10px #00000012" }}>
                                            <div className='searchCardHolder'>
                                                <div className='primaryInfo'>
                                                    <div className='imageHolder position-relative ps-1'>
                                                        <div className='imgwrpr'>
                                                            <Skeleton className='w-100 h-100' />
                                                        </div>

                                                    </div>
                                                    <div className='contentHolder position-relative d-flex  justify-content-between pb-3 mt-2'>
                                                        <div className='leftContentHolder d-flex flex-column h-100 justify-content-between'>
                                                            <div className='d-flex flex-column column-gap-2'>
                                                                <div className='h5'>
                                                                    <Skeleton className='w-100' style={{ textDecoration: "none", color: "black" }} />


                                                                </div>
                                                                <div className='d-flex column-gap-4'>

                                                                    <div >
                                                                        <div className={`rounded-circle  `} style={{ width: "40px", height: "40px" }}>
                                                                            <Skeleton className='w-100 rounded-circle h-100' />

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ fontSize: "12px" }}>
                                                                <div className=' '>
                                                                    <div className='  align-items-center'>
                                                                        <div>
                                                                            <Skeleton />
                                                                        </div>
                                                                        <div>
                                                                            <Skeleton />
                                                                        </div>
                                                                    </div>
                                                                    <div className=' '>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <div>
                                                                        <Skeleton />
                                                                    </div>
                                                                </div>

                                                                <div className='d-flex column-gap-3'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <div className='me-2' style={{ width: "20px", height: "20px" }}>
                                                                            <Skeleton />
                                                                        </div>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <div>
                                                                        <Skeleton />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='rightContentHolder'>
                                                            <div className='text-end reightContent'>
                                                                <h4 className='superDeal'>
                                                                    <Skeleton />
                                                                </h4>
                                                                <div className=' justify-content-end column-gap-2' style={{ fontSize: "12px" }}>
                                                                    <div style={{ color: "#9FA1A8" }}>
                                                                        <Skeleton />
                                                                    </div>
                                                                    {/* <div style={{color:"red",fontWeight:"600"}}>
                                             Last 1 Seat
                                         </div> */}
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontSize: "12px", color: "GrayText" }}>
                                                                        <Skeleton />
                                                                    </div>
                                                                    <h4 style={{ fontWeight: "700", fontSize: "20px" }}>
                                                                        <Skeleton />
                                                                    </h4>
                                                                </div>
                                                                <div style={{ fontWeight: "300", fontSize: "10px" }}>
                                                                    <Skeleton />
                                                                </div>
                                                                <div className='  w-100'>
                                                                    <div className='w-100 h-100  row-gap-2 justify-content-center align-items-center flex-column'>
                                                                        <Skeleton style={{ color: "black", textDecoration: "none" }} className='w-100 viewDetails d-flex justify-content-center align-items-center p-3 rounded-3 border h-100' />
                                                                        <div className=' w-100 justify-content-center align-items-center column-gap-3 '>
                                                                            <Skeleton style={{ cursor: "pointer" }} className=' d-flex justify-content-center align-items-center w-100' />


                                                                            <Skeleton style={{ cursor: "pointer" }} className=' d-flex justify-content-center align-items-center w-100' />


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                ) : packages.map(
                                    (el) => {
                                        return (
                                            <>
                                                <div key={el.package_id} className='searchCard bg-white rounded-3' style={{ width: "100%", boxShadow: "0 0 10px #00000012" }}>
                                                    <div className='searchCardHolder'>
                                                        <div className='primaryInfo'>
                                                            <div className='imageHolder position-relative ps-1'>
                                                                <div className='imgwrpr'>
                                                                    <img src={el.BannerImage} alt={el.package_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                                </div>
                                                                <a onClick={() => dispatch(setIsEditing(false))} href={`/package/${el.package_id}`}></a>
                                                                <button onClick={() => { new Notification("68M Holidays", { body: "This is test notification" }) }} className='d-flex align-items-center column-gap-2 position-absolute m-2 p-1 text-blue-600 rounded-3' style={{ bottom: 10, background: "white", fontSize: "12px" }}>
                                                                    <div className='rounded-circle d-flex justify-content-center align-items-center border border-blue-600' style={{ width: "12px", height: "12px", fontSize: "12px" }}>+</div> <div>compare</div>
                                                                </button>
                                                            </div>
                                                            <div className='contentHolder position-relative d-flex  justify-content-between pb-3 mt-2'>
                                                                <div className='leftContentHolder d-flex flex-column h-100 justify-content-between'>
                                                                    <div className='d-flex flex-column column-gap-2'>
                                                                        <div className='h5'>
                                                                            <a style={{ textDecoration: "none", color: "black" }} href={`/package/${el.package_id}`}>
                                                                                {el.package_name}
                                                                            </a>

                                                                        </div>
                                                                        <div className='d-flex column-gap-4'>
                                                                            {JSON.parse(el?.TourIncludes)?.map(e => (
                                                                                e.provided &&
                                                                                <div key={el.label}>
                                                                                    <div className={`rounded-circle d-flex justify-content-center align-items-center ${!e.provided && "provided"}`} style={{ background: "linear-gradient(180deg,#A6A6A6 0%,rgba(166,166,166,0) 100%)", width: "40px", height: "40px" }}>
                                                                                        {console.log(e.label)}
                                                                                        {tourIncludes.filter(f => f?.label == e?.label)[0]?.svg}
                                                                                    </div>

                                                                                </div>))}
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ fontSize: "12px" }}>
                                                                        <div className='d-flex column-gap-2'>
                                                                            <div className='d-flex column-gap-2 align-items-center border-right-1 pe-2'>
                                                                                <div>
                                                                                    <svg _ngcontent-veenaworld-c86="" width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-veenaworld-c86="" d="M1.85682 8.31455L1.53691 8.55469L1.85682 8.31456L6.37499 14.3337L10.8932 8.31456C11.4015 7.63734 11.6 6.66099 11.6 5.6543C11.6 2.75047 9.25872 0.4 6.37499 0.4C3.49127 0.4 1.14999 2.75047 1.15 5.6543C1.15 6.09432 1.21014 6.6101 1.3326 7.09683C1.45623 7.58824 1.63596 8.02033 1.85682 8.31455ZM3.60787 5.65429C3.60787 4.1214 4.84498 2.87484 6.37499 2.87484C7.90501 2.87484 9.14212 4.1214 9.14212 5.6543C9.14212 7.1872 7.90501 8.43375 6.37499 8.43375C4.84498 8.43375 3.60787 7.1872 3.60787 5.65429Z" fill="white" stroke="#595959" strokeWidth="0.8"></path></svg>
                                                                                </div>
                                                                                <div>
                                                                                    Travel <span style={{ fontWeight: "600" }}>6</span> Days
                                                                                </div>
                                                                            </div>
                                                                            <div className='border-right-1 pe-3'>
                                                                                <span style={{ fontWeight: "600" }}>1</span> Country
                                                                            </div>
                                                                            <div>
                                                                                <span style={{ fontWeight: "600" }}>5</span> Cities
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className='d-flex column-gap-3'>
                                                                            <div className='d-flex align-items-center'>
                                                                                <div className='me-2' style={{ width: "20px", height: "20px" }}>
                                                                                    <img alt="depart icon" style={{ width: "100%", height: "100%", objectFit: "containe" }} src={"/assets/departures.png"} />
                                                                                </div>
                                                                                <span className='me-2' style={{ fontWeight: "600" }}>2</span> Departure Cities
                                                                            </div>
                                                                            <div>
                                                                                <span style={{ fontWeight: "600" }}>23</span> Departure Dates
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {(role == process.env.NEXT_PUBLIC_ADMIN || role == process.env.NEXT_PUBLIC_SUPER_ADMIN) && (<div className={`position-absolute rounded-pill border p-1 ${el.Status === "PUBLISHED" && 'bg-green-600 text-white'} ${el.Status === "pending" && 'bg-red-600 text-white'}`} style={{ right: 10, top: -15, fontSize: "12px", fontWeight: "500" }}>
                                                                    {el.Status}
                                                                </div>)}
                                                                <div className='rightContentHolder'>
                                                                    <div className='text-end reightContent'>
                                                                        <h4 className='superDeal'>
                                                                            SUPER DEAL PRICE
                                                                        </h4>
                                                                        <div className='d-flex justify-content-end column-gap-2' style={{ fontSize: "12px" }}>
                                                                            <div style={{ color: "#9FA1A8" }}>
                                                                                (17 Jan 2024)
                                                                            </div>
                                                                            {/* <div style={{color:"red",fontWeight:"600"}}>
                                                        Last 1 Seat
                                                    </div> */}
                                                                        </div>
                                                                        <div>
                                                                            <div style={{ fontSize: "12px", color: "GrayText" }}>
                                                                                Starts From
                                                                            </div>
                                                                            <h4 style={{ fontWeight: "700", fontSize: "20px" }}>
                                                                                {formatter.format(JSON.parse(el?.pricingTable)?.find(d => d.roomType.toLowerCase() == "twin sharing")?.price)}
                                                                            </h4>
                                                                        </div>
                                                                        <div style={{ fontWeight: "300", fontSize: "10px" }}>
                                                                            per person on twin sharing
                                                                        </div>
                                                                        <div className='button  w-100'>
                                                                            <div className='w-100 h-100 d-flex row-gap-2 justify-content-center align-items-center flex-column'>
                                                                                <a href={`/package/${el.package_id}`} style={{ color: "black", textDecoration: "none" }} className='w-100 viewDetails d-flex justify-content-center align-items-center p-3 rounded-3 border h-100'>
                                                                                    View Details
                                                                                </a>
                                                                                <div className='d-flex w-100 justify-content-center align-items-center column-gap-3 '>
                                                                                    <div onClick={() => handleQuickQuote(el.package_id, el.package_name, el.pricingTable)} style={{ cursor: "pointer" }} className='buttonQ d-flex justify-content-center align-items-center w-100'>
                                                                                        Quick Quote
                                                                                    </div>
                                                                                    <div style={{ cursor: "pointer" }} className='buttonQ d-flex justify-content-center align-items-center w-100'>
                                                                                        Enquire Now
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

                                            </>
                                        )
                                    }
                                )}



                            </div>
                        </div>

                    </div>

                </div>
                {modal && (<div className='d-flex justify-content-center align-items-center' style={{ position: "fixed", top: 0, backgroundColor: "rgba(0,0,0,0.45)", width: "100%", height: "100%", display: "block", zIndex: 4 }} >

                    <OutsideAlerter setModal={setModal}>

                        <div className='rounded-3 d-flex flex-column justify-content-between  shadow-3' style={{ width: "500px", height: "600px", background: "white" }}>
                            {type === "qQuote" && (<div className='d-flex h-100 flex-column justify-content-between align-content-between align-items-between'>
                                <div className='w-100  p-5 text-black'>
                                    <div>
                                        <h5>
                                            {packagName}
                                        </h5>
                                    </div>
                                    <div>
                                        <div onClick={() => setToggleGuest(!toggleGuest)} className='d-flex justify-content-between align-items-center' style={{ fontSize: "14px", minHeight: "65px", cursor: "pointer" }}>
                                            <div>
                                                Guest & Rooms <span className='ms-3' style={{ fontWeight: '300', fontSize: "12px" }}>Maximum 6 guests at a time</span>
                                            </div>
                                            <div>
                                                <div>
                                                    <i className="fa-solid fa-angle-down"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`tguest ${toggleGuest && "active"}`}>
                                            <div className={`d-flex justify-content-between align-items-center `}>
                                                <div className='d-flex column-gap-1 align-items-center' style={{ fontSize: "14px" }}>
                                                    <div className='m-3'>
                                                        <img src="https://www.veenaworld.com/adult.cb95040dd8241eca.svg" alt="" srcset="" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: "500" }}>
                                                            Adults
                                                        </div>
                                                        <div style={{ fontWeight: "300" }}>
                                                            Above 12 yrs
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center column-gap-3'>
                                                    <div style={{ width: "30px", height: "30px", cursor: "pointer" }} className='rounded-circle bg-gray-300 d-flex justify-content-center align-items-center' onClick={() => { (adultCount > 0 && (adultCount + childCount + infantCount) > 0) && setAdultCount(adultCount - 1) }}>
                                                        <i className="fa-solid fa-minus"></i>
                                                    </div>
                                                    <div>
                                                        {adultCount}
                                                    </div>
                                                    <div style={{ width: "30px", height: "30px", cursor: "pointer" }} className='rounded-circle bg-gray-300 d-flex justify-content-center align-items-center' onClick={() => { (adultCount < 6 && (adultCount + childCount + infantCount) != 6) ? setAdultCount(adultCount + 1) : "" }}>
                                                        <i className="fa-solid fa-plus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='d-flex column-gap-1 align-items-center' style={{ fontSize: "14px" }}>
                                                    <div className='m-3'>
                                                        <img src="https://www.veenaworld.com/child.09afa0be97abb6e4.svg" alt="" srcset="" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: "500" }}>
                                                            Child
                                                        </div>
                                                        <div style={{ fontWeight: "300" }}>
                                                            Age 2 - 11 yrs
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center column-gap-3'>
                                                    <div style={{ width: "30px", height: "30px", cursor: "pointer" }} className='rounded-circle bg-gray-300 d-flex justify-content-center align-items-center' onClick={() => { (childCount > 0 && (adultCount + childCount + infantCount) > 0) && setChildCount(childCount - 1) }}>
                                                        <i className="fa-solid fa-minus"></i>
                                                    </div>
                                                    <div>
                                                        {childCount}
                                                    </div>
                                                    <div style={{ width: "30px", height: "30px", cursor: "pointer" }} className='rounded-circle bg-gray-300 d-flex justify-content-center align-items-center' onClick={() => { (childCount < 6 && (adultCount + childCount + infantCount) != 6) && setChildCount(childCount + 1) }}>
                                                        <i className="fa-solid fa-plus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='d-flex column-gap-1 align-items-center' style={{ fontSize: "14px" }}>
                                                    <div className='m-3'>
                                                        <img src="https://www.veenaworld.com/infant.bd53355e2ae9cdf0.svg" alt="" srcset="" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: "500" }}>
                                                            Infant
                                                        </div>
                                                        <div style={{ fontWeight: "300" }}>
                                                            Ages  0 - 1 yr
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center column-gap-3'>
                                                    <div style={{ width: "30px", height: "30px", cursor: "pointer" }} className='rounded-circle bg-gray-300 d-flex justify-content-center align-items-center' onClick={() => { (infantCount > 0 && (adultCount + childCount + infantCount) > 0) && setInfantCount(infantCount - 1) }}>
                                                        <i className="fa-solid fa-minus"></i>
                                                    </div>
                                                    <div>
                                                        {infantCount}
                                                    </div>
                                                    <div style={{ width: "30px", height: "30px", cursor: "pointer" }} className='rounded-circle bg-gray-300 d-flex justify-content-center align-items-center' onClick={() => { (infantCount < 6 && (adultCount + childCount + infantCount) != 6) && setInfantCount(infantCount + 1) }}>
                                                        <i className="fa-solid fa-plus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='p-4 border-top-1'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='d-flex align-items-center column-gap-2' style={{ fontSize: "14px", fontWeight: "400" }}>
                                            <div>
                                                <img src="https://www.veenaworld.com/user.12697309d11c5a2a.svg" alt="" />
                                            </div>
                                            <div>
                                                {adultCount} Adult <span className='text-gray-300'>|</span> {childCount} Child <span className='text-gray-300'>|</span> {infantCount} Infant
                                            </div>
                                        </div>
                                        <div>
                                            <div className='fw-bolder'>
                                                {/* {formatter.format(pricingtTable[0])} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                            {type === "qEnquiry" && (<div></div>)}
                        </div>
                    </OutsideAlerter>

                </div>)}
            </div>
        </>
    )
}

async function getPackages() {



    const packages = (await fetch("/api/package/getPackages?user=all", { method: "GET" })).json()


    return packages;

}

export default Pakcages

