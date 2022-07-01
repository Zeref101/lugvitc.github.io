import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import TopBarTimeDate from './topBarTimeDate';
import TerminalWindow from '../terminal/terminalWindow';

import useSettings from '../../hooks/useSettings';
import LugvitcLogo from '../../images/Tux.svg';

import './topBar.css';
import './settings.css';

export default function TopBar({ refer, topBarLinks }) {
    const settingsDialog = useRef(null);
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

    const openSettings = () => {
        setSettingsDialogOpen(true);
        if (settingsDialog.current) settingsDialog.current.showModal();
    };

    const closeSettings = () => {
        setSettingsDialogOpen(false);
        if (settingsDialog.current) settingsDialog.current.close();
    };

    const {
        animationsOn,
        setAnimationsOn,
        terminalDotsOnLeft,
        setTerminalDotsOnLeft
    } = useSettings();

    return (
        <header ref={refer} id='top-bar'>
            <div className='top-bar-contents'>
                <div className='top-bar-logo'>
                    <img src={LugvitcLogo} alt='lug logo' />
                </div>
                <nav id='top-bar-links'>
                    {topBarLinks.map((nav, index) => (
                        <NavLink
                            key={index}
                            className={currentNavLink =>
                                'top-bar-element-clickable ' +
                                (currentNavLink.isActive
                                    ? 'top-bar-element-clickable-active'
                                    : 'top-bar-element-clickable-inactive')
                            }
                            to={nav.link}
                        >
                            {nav.title}
                        </NavLink>
                    ))}
                </nav>
                <div className='top-bar-element-non-clickable'>
                    <TopBarTimeDate />
                </div>
                <div
                    className={`top-bar-settings ${
                        settingsDialogOpen ? 'open' : 'close'
                    }`}
                >
                    <svg
                        onClick={openSettings}
                        xmlns='http://www.w3.org/2000/svg'
                        enableBackground='new 0 0 24 24'
                        height='24px'
                        viewBox='0 0 24 24'
                        width='24px'
                        fill='#000000'
                    >
                        <g>
                            <path d='M0,0h24v24H0V0z' fill='none' />
                            <path d='M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z' />
                        </g>
                    </svg>
                </div>
            </div>
            <dialog className='settings' ref={settingsDialog} open={false}>
                <TerminalWindow title='Settings' onClickRed={closeSettings}>
                    <h3>Settings</h3>
                    <div
                        className='settings-toggle'
                        onClick={() => setAnimationsOn(!animationsOn)}
                    >
                        <input type='checkbox' checked={animationsOn} /> Show
                        animations
                    </div>
                    <div
                        className='settings-toggle'
                        onClick={() =>
                            setTerminalDotsOnLeft(!terminalDotsOnLeft)
                        }
                    >
                        <input type='checkbox' checked={terminalDotsOnLeft} />{' '}
                        Terminal dots on left
                    </div>
                </TerminalWindow>
            </dialog>
            <div className='bottom-strip' />
        </header>
    );
}

