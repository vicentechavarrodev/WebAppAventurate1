
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

export const icons = {
    UserLocationIcon,
    PinLocationIcon
};

function PinLocationIcon(icon) {
    return new  L.icon({
        iconUrl: `/app-images/${icon === '' ? 'pin.svg' : icon}`,
        iconRetinaUrl: `/app-images/${icon === '' ? 'pin.svg' : icon}`,
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76],
        className: 'leaflet-venue-icon'
    });
}

function UserLocationIcon() {
    return new  L.icon({
        iconUrl: '/app-images/location.svg',
        iconRetinaUrl: '/app-images/location.svg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        shadowSize: [29, 40],
        shadowAnchor: [7, 40],
        popupAnchor: [-30, -76],
        className: 'leaflet-venue-icon'
    });
}


