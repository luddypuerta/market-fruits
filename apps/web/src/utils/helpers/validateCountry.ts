export const validateCountryInAmerica = async (countryName: string): Promise<boolean> => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/region/america");
    const countries = await response.json();

    return countries.some((c: any) =>
      c.name.common.toLowerCase() === countryName.trim().toLowerCase()
    );
  } catch (error) {
    console.error("Error al validar el país:", error);
    return false;
  }
};
