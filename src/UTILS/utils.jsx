import { ReactComponent as Action } from '../SVG/action-svgrepo-com.svg';
// Import other SVG components as needed

// Function to return the corresponding icon component based on typeName
export const iconesByType = (typeName) => {
    switch (typeName) {
        case "Action":
            return <Action /> ;
        // Add other cases for different types
        default:
            return null; // Or a default icon/component
    }
};
