/**
 * KeyClean Pro - Keyboard Layouts Matrix
 * Contains accurate key structures, labels, flex factors, and event code bindings
 */

const KEYBOARD_LAYOUTS = {
    mac: {
        name: 'MacBook / Apple Magic Keyboard',
        type: 'compact',
        rows: [
            [
                { code: 'Escape', label: 'esc', sub: '', flex: 1.4 },
                { code: 'F1', label: 'F1', sub: '🔅', flex: 1 },
                { code: 'F2', label: 'F2', sub: '🔆', flex: 1 },
                { code: 'F3', label: 'F3', sub: '🎛️', flex: 1 },
                { code: 'F4', label: 'F4', sub: '🔍', flex: 1 },
                { code: 'F5', label: 'F5', sub: '🎙️', flex: 1 },
                { code: 'F6', label: 'F6', sub: '🌙', flex: 1 },
                { code: 'F7', label: 'F7', sub: '⏮️', flex: 1 },
                { code: 'F8', label: 'F8', sub: '⏯️', flex: 1 },
                { code: 'F9', label: 'F9', sub: '⏭️', flex: 1 },
                { code: 'F10', label: 'F10', sub: '🔇', flex: 1 },
                { code: 'F11', label: 'F11', sub: '🔉', flex: 1 },
                { code: 'F12', label: 'F12', sub: '🔊', flex: 1 },
                { code: 'Power', label: '⏻', sub: '', flex: 1.1 }
            ],
            [
                { code: 'Backquote', label: '`', sub: '~', flex: 1 },
                { code: 'Digit1', label: '1', sub: '!', flex: 1 },
                { code: 'Digit2', label: '2', sub: '@', flex: 1 },
                { code: 'Digit3', label: '3', sub: '#', flex: 1 },
                { code: 'Digit4', label: '4', sub: '$', flex: 1 },
                { code: 'Digit5', label: '5', sub: '%', flex: 1 },
                { code: 'Digit6', label: '6', sub: '^', flex: 1 },
                { code: 'Digit7', label: '7', sub: '&', flex: 1 },
                { code: 'Digit8', label: '8', sub: '*', flex: 1 },
                { code: 'Digit9', label: '9', sub: '(', flex: 1 },
                { code: 'Digit0', label: '0', sub: ')', flex: 1 },
                { code: 'Minus', label: '-', sub: '_', flex: 1 },
                { code: 'Equal', label: '=', sub: '+', flex: 1 },
                { code: 'Backspace', label: 'delete', sub: '⌫', flex: 1.8 }
            ],
            [
                { code: 'Tab', label: 'tab', sub: '⇥', flex: 1.6 },
                { code: 'KeyQ', label: 'Q', sub: '', flex: 1 },
                { code: 'KeyW', label: 'W', sub: '', flex: 1 },
                { code: 'KeyE', label: 'E', sub: '', flex: 1 },
                { code: 'KeyR', label: 'R', sub: '', flex: 1 },
                { code: 'KeyT', label: 'T', sub: '', flex: 1 },
                { code: 'KeyY', label: 'Y', sub: '', flex: 1 },
                { code: 'KeyU', label: 'U', sub: '', flex: 1 },
                { code: 'KeyI', label: 'I', sub: '', flex: 1 },
                { code: 'KeyO', label: 'O', sub: '', flex: 1 },
                { code: 'KeyP', label: 'P', sub: '', flex: 1 },
                { code: 'BracketLeft', label: '[', sub: '{', flex: 1 },
                { code: 'BracketRight', label: ']', sub: '}', flex: 1 },
                { code: 'Backslash', label: '\\', sub: '|', flex: 1.3 }
            ],
            [
                { code: 'CapsLock', label: 'caps lock', sub: '⇪', flex: 1.9 },
                { code: 'KeyA', label: 'A', sub: '', flex: 1 },
                { code: 'KeyS', label: 'S', sub: '', flex: 1 },
                { code: 'KeyD', label: 'D', sub: '', flex: 1 },
                { code: 'KeyF', label: 'F', sub: '', flex: 1 },
                { code: 'KeyG', label: 'G', sub: '', flex: 1 },
                { code: 'KeyH', label: 'H', sub: '', flex: 1 },
                { code: 'KeyJ', label: 'J', sub: '', flex: 1 },
                { code: 'KeyK', label: 'K', sub: '', flex: 1 },
                { code: 'KeyL', label: 'L', sub: '', flex: 1 },
                { code: 'Semicolon', label: ';', sub: ':', flex: 1 },
                { code: 'Quote', label: '\'', sub: '"', flex: 1 },
                { code: 'Enter', label: 'return', sub: '↩', flex: 2.1 }
            ],
            [
                { code: 'ShiftLeft', label: 'shift', sub: '⇧', flex: 2.4 },
                { code: 'KeyZ', label: 'Z', sub: '', flex: 1 },
                { code: 'KeyX', label: 'X', sub: '', flex: 1 },
                { code: 'KeyC', label: 'C', sub: '', flex: 1 },
                { code: 'KeyV', label: 'V', sub: '', flex: 1 },
                { code: 'KeyB', label: 'B', sub: '', flex: 1 },
                { code: 'KeyN', label: 'N', sub: '', flex: 1 },
                { code: 'KeyM', label: 'M', sub: '', flex: 1 },
                { code: 'Comma', label: ',', sub: '<', flex: 1 },
                { code: 'Period', label: '.', sub: '>', flex: 1 },
                { code: 'Slash', label: '/', sub: '?', flex: 1 },
                { code: 'ShiftRight', label: 'shift', sub: '⇧', flex: 2.5 }
            ],
            [
                { code: 'Fn', label: 'fn', sub: '🌐', flex: 1 },
                { code: 'ControlLeft', label: 'control', sub: '⌃', flex: 1.2 },
                { code: 'AltLeft', label: 'option', sub: '⌥', flex: 1.3 },
                { code: 'MetaLeft', label: 'command', sub: '⌘', flex: 1.5 },
                { code: 'Space', label: 'space', sub: '', flex: 5.5 },
                { code: 'MetaRight', label: 'command', sub: '⌘', flex: 1.5 },
                { code: 'AltRight', label: 'option', sub: '⌥', flex: 1.3 },
                { code: 'ArrowLeft', label: '◀', sub: '', flex: 0.95 },
                {
                    code: 'ArrowUpDown',
                    isSplit: true,
                    top: { code: 'ArrowUp', label: '▲' },
                    bottom: { code: 'ArrowDown', label: '▼' },
                    flex: 0.95
                },
                { code: 'ArrowRight', label: '▶', sub: '', flex: 0.95 }
            ]
        ]
    },

    windows: {
        name: 'Windows Laptop / PC',
        type: 'compact',
        rows: [
            [
                { code: 'Escape', label: 'Esc', sub: '', flex: 1.2 },
                { code: 'F1', label: 'F1', sub: '', flex: 1 },
                { code: 'F2', label: 'F2', sub: '', flex: 1 },
                { code: 'F3', label: 'F3', sub: '', flex: 1 },
                { code: 'F4', label: 'F4', sub: '', flex: 1 },
                { code: 'F5', label: 'F5', sub: '', flex: 1 },
                { code: 'F6', label: 'F6', sub: '', flex: 1 },
                { code: 'F7', label: 'F7', sub: '', flex: 1 },
                { code: 'F8', label: 'F8', sub: '', flex: 1 },
                { code: 'F9', label: 'F9', sub: '', flex: 1 },
                { code: 'F10', label: 'F10', sub: '', flex: 1 },
                { code: 'F11', label: 'F11', sub: '', flex: 1 },
                { code: 'F12', label: 'F12', sub: '', flex: 1 },
                { code: 'Delete', label: 'Del', sub: '', flex: 1.1 }
            ],
            [
                { code: 'Backquote', label: '`', sub: '~', flex: 1 },
                { code: 'Digit1', label: '1', sub: '!', flex: 1 },
                { code: 'Digit2', label: '2', sub: '@', flex: 1 },
                { code: 'Digit3', label: '3', sub: '#', flex: 1 },
                { code: 'Digit4', label: '4', sub: '$', flex: 1 },
                { code: 'Digit5', label: '5', sub: '%', flex: 1 },
                { code: 'Digit6', label: '6', sub: '^', flex: 1 },
                { code: 'Digit7', label: '7', sub: '&', flex: 1 },
                { code: 'Digit8', label: '8', sub: '*', flex: 1 },
                { code: 'Digit9', label: '9', sub: '(', flex: 1 },
                { code: 'Digit0', label: '0', sub: ')', flex: 1 },
                { code: 'Minus', label: '-', sub: '_', flex: 1 },
                { code: 'Equal', label: '=', sub: '+', flex: 1 },
                { code: 'Backspace', label: 'Backspace', sub: '⌫', flex: 2 }
            ],
            [
                { code: 'Tab', label: 'Tab', sub: '⇥', flex: 1.5 },
                { code: 'KeyQ', label: 'Q', sub: '', flex: 1 },
                { code: 'KeyW', label: 'W', sub: '', flex: 1 },
                { code: 'KeyE', label: 'E', sub: '', flex: 1 },
                { code: 'KeyR', label: 'R', sub: '', flex: 1 },
                { code: 'KeyT', label: 'T', sub: '', flex: 1 },
                { code: 'KeyY', label: 'Y', sub: '', flex: 1 },
                { code: 'KeyU', label: 'U', sub: '', flex: 1 },
                { code: 'KeyI', label: 'I', sub: '', flex: 1 },
                { code: 'KeyO', label: 'O', sub: '', flex: 1 },
                { code: 'KeyP', label: 'P', sub: '', flex: 1 },
                { code: 'BracketLeft', label: '[', sub: '{', flex: 1 },
                { code: 'BracketRight', label: ']', sub: '}', flex: 1 },
                { code: 'Backslash', label: '\\', sub: '|', flex: 1.5 }
            ],
            [
                { code: 'CapsLock', label: 'Caps Lock', sub: '⇪', flex: 1.8 },
                { code: 'KeyA', label: 'A', sub: '', flex: 1 },
                { code: 'KeyS', label: 'S', sub: '', flex: 1 },
                { code: 'KeyD', label: 'D', sub: '', flex: 1 },
                { code: 'KeyF', label: 'F', sub: '', flex: 1 },
                { code: 'KeyG', label: 'G', sub: '', flex: 1 },
                { code: 'KeyH', label: 'H', sub: '', flex: 1 },
                { code: 'KeyJ', label: 'J', sub: '', flex: 1 },
                { code: 'KeyK', label: 'K', sub: '', flex: 1 },
                { code: 'KeyL', label: 'L', sub: '', flex: 1 },
                { code: 'Semicolon', label: ';', sub: ':', flex: 1 },
                { code: 'Quote', label: '\'', sub: '"', flex: 1 },
                { code: 'Enter', label: 'Enter', sub: '↵', flex: 2.2 }
            ],
            [
                { code: 'ShiftLeft', label: 'Shift', sub: '⇧', flex: 2.3 },
                { code: 'KeyZ', label: 'Z', sub: '', flex: 1 },
                { code: 'KeyX', label: 'X', sub: '', flex: 1 },
                { code: 'KeyC', label: 'C', sub: '', flex: 1 },
                { code: 'KeyV', label: 'V', sub: '', flex: 1 },
                { code: 'KeyB', label: 'B', sub: '', flex: 1 },
                { code: 'KeyN', label: 'N', sub: '', flex: 1 },
                { code: 'KeyM', label: 'M', sub: '', flex: 1 },
                { code: 'Comma', label: ',', sub: '<', flex: 1 },
                { code: 'Period', label: '.', sub: '>', flex: 1 },
                { code: 'Slash', label: '/', sub: '?', flex: 1 },
                { code: 'ShiftRight', label: 'Shift', sub: '⇧', flex: 2.6 }
            ],
            [
                { code: 'ControlLeft', label: 'Ctrl', sub: '', flex: 1.3 },
                { code: 'MetaLeft', label: 'Win', sub: '⊞', flex: 1.2 },
                { code: 'AltLeft', label: 'Alt', sub: '', flex: 1.3 },
                { code: 'Space', label: 'Space', sub: '', flex: 5.6 },
                { code: 'AltRight', label: 'Alt', sub: '', flex: 1.3 },
                { code: 'ContextMenu', label: 'Menu', sub: '☰', flex: 1.1 },
                { code: 'ControlRight', label: 'Ctrl', sub: '', flex: 1.3 },
                { code: 'ArrowLeft', label: '◀', sub: '', flex: 0.95 },
                {
                    code: 'ArrowUpDown',
                    isSplit: true,
                    top: { code: 'ArrowUp', label: '▲' },
                    bottom: { code: 'ArrowDown', label: '▼' },
                    flex: 0.95
                },
                { code: 'ArrowRight', label: '▶', sub: '', flex: 0.95 }
            ]
        ]
    },

    fullsize: {
        name: 'Full-Size 100% Desktop (with Numpad)',
        type: 'full',
        sections: [
            {
                id: 'main',
                rows: [
                    [
                        { code: 'Escape', label: 'Esc', sub: '', flex: 1 },
                        { code: 'spacer', isSpacer: true, flex: 1 },
                        { code: 'F1', label: 'F1', sub: '', flex: 1 },
                        { code: 'F2', label: 'F2', sub: '', flex: 1 },
                        { code: 'F3', label: 'F3', sub: '', flex: 1 },
                        { code: 'F4', label: 'F4', sub: '', flex: 1 },
                        { code: 'spacer', isSpacer: true, flex: 0.5 },
                        { code: 'F5', label: 'F5', sub: '', flex: 1 },
                        { code: 'F6', label: 'F6', sub: '', flex: 1 },
                        { code: 'F7', label: 'F7', sub: '', flex: 1 },
                        { code: 'F8', label: 'F8', sub: '', flex: 1 },
                        { code: 'spacer', isSpacer: true, flex: 0.5 },
                        { code: 'F9', label: 'F9', sub: '', flex: 1 },
                        { code: 'F10', label: 'F10', sub: '', flex: 1 },
                        { code: 'F11', label: 'F11', sub: '', flex: 1 },
                        { code: 'F12', label: 'F12', sub: '', flex: 1 }
                    ],
                    [
                        { code: 'Backquote', label: '`', sub: '~', flex: 1 },
                        { code: 'Digit1', label: '1', sub: '!', flex: 1 },
                        { code: 'Digit2', label: '2', sub: '@', flex: 1 },
                        { code: 'Digit3', label: '3', sub: '#', flex: 1 },
                        { code: 'Digit4', label: '4', sub: '$', flex: 1 },
                        { code: 'Digit5', label: '5', sub: '%', flex: 1 },
                        { code: 'Digit6', label: '6', sub: '^', flex: 1 },
                        { code: 'Digit7', label: '7', sub: '&', flex: 1 },
                        { code: 'Digit8', label: '8', sub: '*', flex: 1 },
                        { code: 'Digit9', label: '9', sub: '(', flex: 1 },
                        { code: 'Digit0', label: '0', sub: ')', flex: 1 },
                        { code: 'Minus', label: '-', sub: '_', flex: 1 },
                        { code: 'Equal', label: '=', sub: '+', flex: 1 },
                        { code: 'Backspace', label: 'Backspace', sub: '', flex: 2 }
                    ],
                    [
                        { code: 'Tab', label: 'Tab', sub: '', flex: 1.5 },
                        { code: 'KeyQ', label: 'Q', sub: '', flex: 1 },
                        { code: 'KeyW', label: 'W', sub: '', flex: 1 },
                        { code: 'KeyE', label: 'E', sub: '', flex: 1 },
                        { code: 'KeyR', label: 'R', sub: '', flex: 1 },
                        { code: 'KeyT', label: 'T', sub: '', flex: 1 },
                        { code: 'KeyY', label: 'Y', sub: '', flex: 1 },
                        { code: 'KeyU', label: 'U', sub: '', flex: 1 },
                        { code: 'KeyI', label: 'I', sub: '', flex: 1 },
                        { code: 'KeyO', label: 'O', sub: '', flex: 1 },
                        { code: 'KeyP', label: 'P', sub: '', flex: 1 },
                        { code: 'BracketLeft', label: '[', sub: '{', flex: 1 },
                        { code: 'BracketRight', label: ']', sub: '}', flex: 1 },
                        { code: 'Backslash', label: '\\', sub: '|', flex: 1.5 }
                    ],
                    [
                        { code: 'CapsLock', label: 'Caps', sub: '', flex: 1.8 },
                        { code: 'KeyA', label: 'A', sub: '', flex: 1 },
                        { code: 'KeyS', label: 'S', sub: '', flex: 1 },
                        { code: 'KeyD', label: 'D', sub: '', flex: 1 },
                        { code: 'KeyF', label: 'F', sub: '', flex: 1 },
                        { code: 'KeyG', label: 'G', sub: '', flex: 1 },
                        { code: 'KeyH', label: 'H', sub: '', flex: 1 },
                        { code: 'KeyJ', label: 'J', sub: '', flex: 1 },
                        { code: 'KeyK', label: 'K', sub: '', flex: 1 },
                        { code: 'KeyL', label: 'L', sub: '', flex: 1 },
                        { code: 'Semicolon', label: ';', sub: ':', flex: 1 },
                        { code: 'Quote', label: '\'', sub: '"', flex: 1 },
                        { code: 'Enter', label: 'Enter', sub: '', flex: 2.2 }
                    ],
                    [
                        { code: 'ShiftLeft', label: 'Shift', sub: '', flex: 2.3 },
                        { code: 'KeyZ', label: 'Z', sub: '', flex: 1 },
                        { code: 'KeyX', label: 'X', sub: '', flex: 1 },
                        { code: 'KeyC', label: 'C', sub: '', flex: 1 },
                        { code: 'KeyV', label: 'V', sub: '', flex: 1 },
                        { code: 'KeyB', label: 'B', sub: '', flex: 1 },
                        { code: 'KeyN', label: 'N', sub: '', flex: 1 },
                        { code: 'KeyM', label: 'M', sub: '', flex: 1 },
                        { code: 'Comma', label: ',', sub: '<', flex: 1 },
                        { code: 'Period', label: '.', sub: '>', flex: 1 },
                        { code: 'Slash', label: '/', sub: '?', flex: 1 },
                        { code: 'ShiftRight', label: 'Shift', sub: '', flex: 2.7 }
                    ],
                    [
                        { code: 'ControlLeft', label: 'Ctrl', sub: '', flex: 1.3 },
                        { code: 'MetaLeft', label: 'Win', sub: '', flex: 1.2 },
                        { code: 'AltLeft', label: 'Alt', sub: '', flex: 1.3 },
                        { code: 'Space', label: '', sub: '', flex: 6.2 },
                        { code: 'AltRight', label: 'Alt', sub: '', flex: 1.3 },
                        { code: 'MetaRight', label: 'Win', sub: '', flex: 1.2 },
                        { code: 'ContextMenu', label: 'Menu', sub: '', flex: 1.2 },
                        { code: 'ControlRight', label: 'Ctrl', sub: '', flex: 1.3 }
                    ]
                ]
            },
            {
                id: 'nav',
                rows: [
                    [
                        { code: 'PrintScreen', label: 'PrtSc', sub: '', flex: 1 },
                        { code: 'ScrollLock', label: 'ScrLk', sub: '', flex: 1 },
                        { code: 'Pause', label: 'Pause', sub: '', flex: 1 }
                    ],
                    [
                        { code: 'Insert', label: 'Ins', sub: '', flex: 1 },
                        { code: 'Home', label: 'Home', sub: '', flex: 1 },
                        { code: 'PageUp', label: 'PgUp', sub: '', flex: 1 }
                    ],
                    [
                        { code: 'Delete', label: 'Del', sub: '', flex: 1 },
                        { code: 'End', label: 'End', sub: '', flex: 1 },
                        { code: 'PageDown', label: 'PgDn', sub: '', flex: 1 }
                    ],
                    [
                        { code: 'spacer', isSpacer: true, flex: 3 }
                    ],
                    [
                        { code: 'spacer', isSpacer: true, flex: 1 },
                        { code: 'ArrowUp', label: '▲', sub: '', flex: 1 },
                        { code: 'spacer', isSpacer: true, flex: 1 }
                    ],
                    [
                        { code: 'ArrowLeft', label: '◀', sub: '', flex: 1 },
                        { code: 'ArrowDown', label: '▼', sub: '', flex: 1 },
                        { code: 'ArrowRight', label: '▶', sub: '', flex: 1 }
                    ]
                ]
            },
            {
                id: 'numpad',
                rows: [
                    [
                        { code: 'NumLock', label: 'Num', sub: '', flex: 1 },
                        { code: 'NumpadDivide', label: '/', sub: '', flex: 1 },
                        { code: 'NumpadMultiply', label: '*', sub: '', flex: 1 },
                        { code: 'NumpadSubtract', label: '-', sub: '', flex: 1 }
                    ],
                    [
                        { code: 'Numpad7', label: '7', sub: 'Home', flex: 1 },
                        { code: 'Numpad8', label: '8', sub: '▲', flex: 1 },
                        { code: 'Numpad9', label: '9', sub: 'PgUp', flex: 1 },
                        { code: 'NumpadAdd', label: '+', sub: '', flex: 1, rowSpan: 2 }
                    ],
                    [
                        { code: 'Numpad4', label: '4', sub: '◀', flex: 1 },
                        { code: 'Numpad5', label: '5', sub: '', flex: 1 },
                        { code: 'Numpad6', label: '6', sub: '▶', flex: 1 }
                    ],
                    [
                        { code: 'Numpad1', label: '1', sub: 'End', flex: 1 },
                        { code: 'Numpad2', label: '2', sub: '▼', flex: 1 },
                        { code: 'Numpad3', label: '3', sub: 'PgDn', flex: 1 },
                        { code: 'NumpadEnter', label: 'Enter', sub: '', flex: 1, rowSpan: 2 }
                    ],
                    [
                        { code: 'Numpad0', label: '0', sub: 'Ins', flex: 2 },
                        { code: 'NumpadDecimal', label: '.', sub: 'Del', flex: 1 }
                    ]
                ]
            }
        ]
    }
};

/**
 * Extracts all unique trackable key codes for a given layout
 */
function getLayoutKeyCodes(layoutKey) {
    const layout = KEYBOARD_LAYOUTS[layoutKey];
    if (!layout) return new Set();

    const codes = new Set();
    if (layout.type === 'compact') {
        layout.rows.forEach(row => {
            row.forEach(key => {
                if (key.code) codes.add(key.code);
                if (key.isSplit) {
                    if (key.top && key.top.code) codes.add(key.top.code);
                    if (key.bottom && key.bottom.code) codes.add(key.bottom.code);
                }
            });
        });
    } else if (layout.type === 'full') {
        layout.sections.forEach(sec => {
            sec.rows.forEach(row => {
                row.forEach(key => {
                    if (!key.isSpacer && key.code) codes.add(key.code);
                });
            });
        });
    }
    return codes;
}

window.KEYBOARD_LAYOUTS = KEYBOARD_LAYOUTS;
window.getLayoutKeyCodes = getLayoutKeyCodes;
