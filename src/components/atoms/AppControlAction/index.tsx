import React from 'react';
// import {AppControlActionProps} from './interface';

const AppControlAction = (props: any) => {
  switch (props.variant) {
    case 'tags': {
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3.94049 13.4477C2.65254 12.1598 2.00857 11.5158 1.76895 10.6803C1.52933 9.8448 1.73411 8.9574 2.14368 7.18262L2.37986 6.15913C2.72443 4.666 2.89672 3.91943 3.40795 3.4082C3.91918 2.89696 4.66575 2.72468 6.15889 2.38011L7.18238 2.14392C8.95716 1.73435 9.84455 1.52957 10.6801 1.76919C11.5156 2.00881 12.1595 2.65278 13.4475 3.94073L14.9722 5.46543C17.213 7.70625 18.3334 8.82666 18.3334 10.2189C18.3334 11.6112 17.213 12.7316 14.9722 14.9724C12.7314 17.2132 11.611 18.3337 10.2187 18.3337C8.82641 18.3337 7.706 17.2132 5.46518 14.9724L3.94049 13.4477Z'
            stroke='#181414'
          />
          <circle
            cx='7.17245'
            cy='7.39941'
            r='1.66667'
            transform='rotate(-45 7.17245 7.39941)'
            stroke='#181414'
          />
          <path
            d='M9.61812 15.416L15.434 9.59997'
            stroke='#6C6868'
            stroke-width='1.5'
            stroke-linecap='round'
          />
        </svg>
      );
    }
    case 'merge': {
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.8334 2.5H4.16675C2.98824 2.5 2.39898 2.5 2.03286 2.8435C1.66675 3.187 1.66675 3.73985 1.66675 4.84555V5.4204C1.66675 6.28527 1.66675 6.7177 1.88308 7.07618C2.09942 7.43466 2.49464 7.65715 3.2851 8.10212L5.71262 9.46865C6.24297 9.7672 6.50814 9.91648 6.69801 10.0813C7.0934 10.4246 7.33681 10.8279 7.44711 11.3226C7.50008 11.5602 7.50008 11.8382 7.50008 12.3941L7.50008 14.6187C7.50008 15.3766 7.50008 15.7556 7.71002 16.0511C7.91996 16.3465 8.29282 16.4923 9.03854 16.7838C10.6041 17.3958 11.3868 17.7018 11.9435 17.3537C12.5001 17.0055 12.5001 16.2099 12.5001 14.6187V12.3941C12.5001 11.8382 12.5001 11.5602 12.553 11.3226C12.6634 10.8279 12.9068 10.4246 13.3022 10.0813C13.492 9.91648 13.7572 9.7672 14.2875 9.46865L16.7151 8.10212C17.5055 7.65715 17.9007 7.43466 18.1171 7.07618C18.3334 6.7177 18.3334 6.28527 18.3334 5.4204V4.84555C18.3334 3.73985 18.3334 3.187 17.9673 2.8435C17.6012 2.5 17.0119 2.5 15.8334 2.5Z'
            stroke='#181414'
          />
        </svg>
      );
    }
    case 'upload': {
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.1667 7.50195C15.9793 7.51204 16.9609 7.59242 17.6012 8.23274C18.3334 8.96497 18.3334 10.1435 18.3334 12.5005V13.3338C18.3334 15.6909 18.3334 16.8694 17.6012 17.6016C16.8689 18.3338 15.6904 18.3338 13.3334 18.3338H6.66675C4.30973 18.3338 3.13121 18.3338 2.39898 17.6016C1.66675 16.8694 1.66675 15.6909 1.66675 13.3338L1.66675 12.5005C1.66675 10.1435 1.66675 8.96497 2.39898 8.23274C3.0393 7.59242 4.02089 7.51204 5.83342 7.50195'
            stroke='#181414'
            stroke-linecap='round'
          />
          <path
            d='M10 12.5L10 1.66667M10 1.66667L12.5 4.58333M10 1.66667L7.5 4.58333'
            stroke='#181414'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      );
    }
    case 'download': {
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.1667 7.50195C15.9793 7.51204 16.9609 7.59242 17.6012 8.23274C18.3334 8.96497 18.3334 10.1435 18.3334 12.5005V13.3338C18.3334 15.6909 18.3334 16.8694 17.6012 17.6016C16.8689 18.3338 15.6904 18.3338 13.3334 18.3338H6.66675C4.30973 18.3338 3.13121 18.3338 2.39898 17.6016C1.66675 16.8694 1.66675 15.6909 1.66675 13.3338L1.66675 12.5005C1.66675 10.1435 1.66675 8.96497 2.39898 8.23274C3.0393 7.59242 4.02089 7.51204 5.83342 7.50195'
            stroke='#181414'
            stroke-linecap='round'
          />
          <path
            d='M10 1.66699L10 12.5003M10 12.5003L7.5 9.58366M10 12.5003L12.5 9.58366'
            stroke='#6C6868'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      );
    }
    case 'downloadUp': {
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.5 12.5C2.5 14.857 2.5 16.0355 3.23223 16.7678C3.96447 17.5 5.14298 17.5 7.5 17.5H12.5C14.857 17.5 16.0355 17.5 16.7678 16.7678C17.5 16.0355 17.5 14.857 17.5 12.5'
            stroke='#181414'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M9.99984 13.3333V2.5M9.99984 2.5L13.3332 6.14583M9.99984 2.5L6.6665 6.14583'
            stroke='#181414'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      );
    }
    case 'send': {
      return (
        <svg
          width='32'
          height='33'
          viewBox='0 0 32 33'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M27.1589 14.5286L24.8821 21.3052C23.2768 26.0832 22.4741 28.4721 21.2971 29.151C20.1774 29.7968 18.7944 29.7968 17.6747 29.151C16.4977 28.4721 15.695 26.0832 14.0897 21.3052C13.832 20.5381 13.7031 20.1545 13.4867 19.8338C13.2771 19.5231 13.008 19.2562 12.6948 19.0482C12.3717 18.8335 11.985 18.7057 11.2118 18.4499C6.39587 16.8573 3.98792 16.061 3.30365 14.8932C2.65269 13.7823 2.65269 12.4103 3.30365 11.2994C3.98792 10.1316 6.39587 9.33531 11.2118 7.74266L18.0422 5.48381C24.0091 3.5105 26.9926 2.52385 28.5675 4.08631C30.1423 5.64876 29.1478 8.60872 27.1589 14.5286ZM17.4671 15.0305C17.0808 14.643 17.0843 14.018 17.4749 13.6347L23.06 8.1547C23.4507 7.7714 24.0806 7.77486 24.4669 8.16244C24.8533 8.55002 24.8498 9.17495 24.4592 9.55826L18.874 15.0383C18.4834 15.4216 17.8535 15.4181 17.4671 15.0305Z'
            fill='#D1132A'
          />
        </svg>
      );
    }
    case 'view':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.72916 12.747C2.02088 11.8269 1.66675 11.3668 1.66675 10.0007C1.66675 8.6345 2.02088 8.17442 2.72916 7.25426C4.14339 5.41695 6.51518 3.33398 10.0001 3.33398C13.485 3.33398 15.8568 5.41695 17.271 7.25426C17.9793 8.17442 18.3334 8.6345 18.3334 10.0007C18.3334 11.3668 17.9793 11.8269 17.271 12.747C15.8568 14.5844 13.485 16.6673 10.0001 16.6673C6.51518 16.6673 4.14339 14.5844 2.72916 12.747Z'
            stroke='#181414'
          />
          <path
            d='M12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10C7.5 8.61929 8.61929 7.5 10 7.5C11.3807 7.5 12.5 8.61929 12.5 10Z'
            stroke='#181414'
          />
        </svg>
      );
    case 'edit':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3.33325 18.334H16.6666'
            stroke='#181414'
            stroke-linecap='round'
          />
          <path
            d='M11.5733 3.05179L12.1912 2.43387C13.215 1.41006 14.8749 1.41006 15.8987 2.43387C16.9225 3.45767 16.9225 5.11758 15.8987 6.14139L15.2808 6.75931M11.5733 3.05179C11.5733 3.05179 11.6505 4.36487 12.8091 5.52347C13.9677 6.68207 15.2808 6.75931 15.2808 6.75931M11.5733 3.05179L5.89247 8.73261C5.50769 9.11739 5.31531 9.30978 5.14985 9.52191C4.95468 9.77214 4.78734 10.0429 4.65081 10.3294C4.53507 10.5722 4.44904 10.8303 4.27696 11.3466L3.54779 13.5341M15.2808 6.75931L9.59999 12.4401C9.21521 12.8249 9.02282 13.0173 8.8107 13.1827C8.56046 13.3779 8.28971 13.5453 8.00324 13.6818C7.76038 13.7975 7.50227 13.8836 6.98604 14.0556L4.79853 14.7848M4.79853 14.7848L4.26381 14.963C4.00977 15.0477 3.72969 14.9816 3.54034 14.7923C3.35099 14.6029 3.28487 14.3228 3.36955 14.0688L3.54779 13.5341M4.79853 14.7848L3.54779 13.5341'
            stroke='#181414'
          />
        </svg>
      );
    case 'add':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='9.99984' cy='10.0003' r='8.33333' stroke='#181414' />
          <path
            d='M12.5 10L10 10M10 10L7.5 10M10 10L10 7.5M10 10L10 12.5'
            stroke='#181414'
            stroke-linecap='round'
          />
        </svg>
      );
    case 'import':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.5 12.5C2.5 14.857 2.5 16.0355 3.23223 16.7678C3.96447 17.5 5.14298 17.5 7.5 17.5H12.5C14.857 17.5 16.0355 17.5 16.7678 16.7678C17.5 16.0355 17.5 14.857 17.5 12.5'
            stroke='#181414'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M9.99984 2.49967V13.333M9.99984 13.333L13.3332 9.68717M9.99984 13.333L6.6665 9.68717'
            stroke='#181414'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      );
    case 'confirm':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M13.3333 3.33301C15.1459 3.3431 16.1274 3.42347 16.7678 4.06379C17.5 4.79603 17.5 5.97454 17.5 8.33156V13.3316C17.5 15.6886 17.5 16.8671 16.7678 17.5993C16.0355 18.3316 14.857 18.3316 12.5 18.3316H7.5C5.14298 18.3316 3.96447 18.3316 3.23223 17.5993C2.5 16.8671 2.5 15.6886 2.5 13.3316V8.33156C2.5 5.97454 2.5 4.79603 3.23223 4.06379C3.87255 3.42347 4.85414 3.3431 6.66667 3.33301'
            stroke='#181414'
          />
          <path
            d='M7.5 11.167L8.92857 12.5003L12.5 9.16699'
            stroke='#181414'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M6.66675 2.91699C6.66675 2.22664 7.22639 1.66699 7.91675 1.66699H12.0834C12.7738 1.66699 13.3334 2.22664 13.3334 2.91699V3.75033C13.3334 4.44068 12.7738 5.00033 12.0834 5.00033H7.91675C7.22639 5.00033 6.66675 4.44068 6.66675 3.75033V2.91699Z'
            stroke='#181414'
          />
        </svg>
      );
    case 'approval':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M13.3333 3.33301C15.1459 3.3431 16.1274 3.42347 16.7678 4.06379C17.5 4.79603 17.5 5.97454 17.5 8.33156V13.3316C17.5 15.6886 17.5 16.8671 16.7678 17.5993C16.0355 18.3316 14.857 18.3316 12.5 18.3316H7.5C5.14298 18.3316 3.96447 18.3316 3.23223 17.5993C2.5 16.8671 2.5 15.6886 2.5 13.3316V8.33156C2.5 5.97454 2.5 4.79603 3.23223 4.06379C3.87255 3.42347 4.85414 3.3431 6.66667 3.33301'
            stroke='#181414'
          />
          <path
            d='M7.5 11.167L8.92857 12.5003L12.5 9.16699'
            stroke='#181414'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M6.66675 2.91699C6.66675 2.22664 7.22639 1.66699 7.91675 1.66699H12.0834C12.7738 1.66699 13.3334 2.22664 13.3334 2.91699V3.75033C13.3334 4.44068 12.7738 5.00033 12.0834 5.00033H7.91675C7.22639 5.00033 6.66675 4.44068 6.66675 3.75033V2.91699Z'
            stroke='#181414'
          />
        </svg>
      );
    case 'pause':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.66675 13.333C1.66675 10.976 1.66675 9.79747 2.39898 9.06524C3.13121 8.33301 4.30973 8.33301 6.66675 8.33301H13.3334C15.6904 8.33301 16.8689 8.33301 17.6012 9.06524C18.3334 9.79747 18.3334 10.976 18.3334 13.333C18.3334 15.69 18.3334 16.8685 17.6012 17.6008C16.8689 18.333 15.6904 18.333 13.3334 18.333H6.66675C4.30973 18.333 3.13121 18.333 2.39898 17.6008C1.66675 16.8685 1.66675 15.69 1.66675 13.333Z'
            stroke='#181414'
          />
          <path
            d='M5 8.33366V6.66699C5 3.90557 7.23858 1.66699 10 1.66699C12.3298 1.66699 14.2874 3.26046 14.8425 5.41699'
            stroke='#181414'
            stroke-linecap='round'
          />
        </svg>
      );
    case 'open':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.3032 6.70839L14.714 6.11913C12.1105 3.51563 7.88937 3.51563 5.28587 6.11913C2.68238 8.72262 2.68238 12.9437 5.28587 15.5472C7.88937 18.1507 12.1105 18.1507 14.714 15.5472C16.228 14.0332 16.8616 11.9721 16.6147 10.0003M15.3032 6.70839H11.7677M15.3032 6.70839V3.17285'
            stroke='#181414'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      );
    case 'cancel':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.3032 6.70839L14.714 6.11913C12.1105 3.51563 7.88937 3.51563 5.28587 6.11913C2.68238 8.72262 2.68238 12.9437 5.28587 15.5472C7.88937 18.1507 12.1105 18.1507 14.714 15.5472C16.228 14.0332 16.8616 11.9721 16.6147 10.0003M15.3032 6.70839H11.7677M15.3032 6.70839V3.17285'
            stroke='#181414'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      );
    case 'delete':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M17.0832 5H2.9165' stroke='#181414' stroke-linecap='round' />
          <path
            d='M15.6946 7.08398L15.3113 12.8332C15.1638 15.0457 15.09 16.1519 14.3692 16.8263C13.6483 17.5007 12.5397 17.5007 10.3223 17.5007H9.67787C7.46054 17.5007 6.35187 17.5007 5.63103 16.8263C4.91019 16.1519 4.83644 15.0457 4.68895 12.8332L4.30566 7.08398'
            stroke='#181414'
            stroke-linecap='round'
          />
          <path
            d='M7.91675 9.16602L8.33342 13.3327'
            stroke='#181414'
            stroke-linecap='round'
          />
          <path
            d='M12.0834 9.16602L11.6667 13.3327'
            stroke='#181414'
            stroke-linecap='round'
          />
          <path
            d='M5.41675 5C5.46331 5 5.4866 5 5.50771 4.99947C6.19391 4.98208 6.79927 4.54576 7.03276 3.90027C7.03994 3.88041 7.04731 3.85832 7.06203 3.81415L7.14294 3.57143C7.212 3.36423 7.24654 3.26063 7.29234 3.17267C7.47509 2.82173 7.8132 2.57803 8.20392 2.51564C8.30186 2.5 8.41106 2.5 8.62947 2.5H11.3707C11.5891 2.5 11.6983 2.5 11.7962 2.51564C12.187 2.57803 12.5251 2.82173 12.7078 3.17267C12.7536 3.26063 12.7882 3.36423 12.8572 3.57143L12.9381 3.81415C12.9528 3.85826 12.9602 3.88042 12.9674 3.90027C13.2009 4.54576 13.8063 4.98208 14.4925 4.99947C14.5136 5 14.5368 5 14.5834 5'
            stroke='#181414'
          />
        </svg>
      );
    default:
      return null;
  }
};

export default AppControlAction;
