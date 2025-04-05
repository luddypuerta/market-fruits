export const validateCountryInAmerica = async (countryName) => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/region/america");
        console.log(response, "response");
        const countries = await response.json();
        return countries.some((c) => c.name.common.toLowerCase() === countryName.trim().toLowerCase());
    }
    catch (error) {
        console.error("Error al validar el país:", error);
        return false;
    }
};
