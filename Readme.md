# Windows 10 UI - JavaScript Project Documentation

## Overview
This project mimics the behavior and design of the Windows 10 UI using HTML, CSS, and JavaScript. It includes interactive features such as the start menu, volume control, notifications, context menu, and quick toggle panels for Wi-Fi and Airplane Mode.

---

## Features Implemented

- Date and time display with 24-hour format
- Volume control with live percentage and icon sync
- Wi-Fi, Airplane, and Hotspot quick toggles with interdependencies
- Start menu popup with animation
- Custom context menu on right-click
- File explorer open/close toggles
- Power button in Start Menu toggles shutdown options
- Control Panel UI with system category layout

---

## Key Functions and Behavior

### 1. showdateandtime
**Purpose**: Display the system time in HH:MM 24-hour format.  
**Uses**: `Date`, `toLocaleTimeString`, `split`, `setInterval`

### 2. decreasebattery
**Purpose**: Simulate battery drain visually using CSS width manipulation.

### 3. hideelements
**Purpose**: Hide the "This PC" window by default on page load.

### 4. toggleState(button, key)
**Purpose**: Toggle the ON/OFF state of a given notification button.  
**Storage**: Uses `localStorage.notification`

---

## Volume Logic

### Storage
- Stored in `localStorage.notification.sound`

### Icon Mapping
| Volume Range | Taskbar Icon  | Popup Icon   |
|--------------|----------------|---------------|
| 0            | volumemuted    | volumemuted   |
| 1-50         | volumelow      | volumelow     |
| 51-100       | volumefull     | volumefull    |

### Important Functions

#### initializeNotificationSettings
Sets default values in localStorage.

#### updateVolumeIcon(volume)
Changes visibility of all icons based on volume level.

#### setupVolumeSlider
Updates localStorage and icons live as user moves the slider.

---

## Wi-Fi, Airplane Mode, and Hotspot Panel

### States stored in: localStorage.wifiPanel

### Behavior
- Turning ON airplane mode disables and turns OFF both Wi-Fi and hotspot.
- Toggling other buttons updates the UI and storage accordingly.

### Icon Display Logic
| State              | Icons Shown  |
|--------------------|---------------|
| Airplane: ON       | airplane      |
| Wi-Fi: ON          | wifi          |
| Wi-Fi: OFF         | wifioff       |

---

## Start Menu

- Triggered by `.start.taskicon`
- Opens `.start-menu` with animation from bottom to top
- Clicking outside closes it

### Animation
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

---

## Power Popup in Start Menu

### Description
- Clicking the power icon inside the Start Menu toggles a power popup menu.
- Available options can include Shutdown, Restart, and Sleep.
- Start Menu hides automatically when power options are opened.

### Functionality
- Power button inside `.start-menu .power-button` toggles `.power-popup` visibility.
- CSS manages its layout and transition.

---

## Custom Context Menu

- Appears on right-click anywhere in the document
- Disappears on left click outside the menu
- Supports nested menu items and custom icons using Remix Icons

---

## Control Panel UI

### Description
- Replicates the Windows 10 Control Panel category layout.
- Each category includes an icon, title, and relevant sub-options.
- Fully styled using CSS grid/flexbox.
- Icons used from Icons8 with `img.icons8.com` links.

### Sections
- System and Security
- Network and Internet
- Hardware and Sound
- Programs
- User Accounts
- Appearance and Personalization
- Clock and Region
- Ease of Access

---

## Event Summary Table

| Event               | Target Selector                 | Purpose                          |
|--------------------|----------------------------------|----------------------------------|
| Clock              | `.datetime span`                | Show current time                |
| Notification Panel | `.notificationicon`             | Show/hide notification panel     |
| Volume Popup       | `.volumefull`, `.volumelow`, etc| Toggle volume control visibility |
| Wi-Fi Panel        | `.icon.wifi`, `.icon.airplane`  | Toggle Wi-Fi settings popup      |
| Start Menu         | `.start.taskicon`               | Slide-in menu on button click    |
| Context Menu       | `document`                      | Show/hide custom right-click menu|
| Power Popup        | `.start-menu .power-button`     | Toggle shutdown options          |

---

## LocalStorage Keys Used

| Key            | Type     | Description                      |
|----------------|----------|----------------------------------|
| `notification` | Object   | Volume, toggles (on/off)         |
| `wifiPanel`    | Object   | Wi-Fi, airplane, hotspot states  |
"""
