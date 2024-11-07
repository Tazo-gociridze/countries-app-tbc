const fetchCountries = async () => {
  try {
    const fetch = (await import("node-fetch")).default;

    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    const countries = data.map((country) => ({
      id: country.cca2,
      name: country.name.common,
      capital:
        country.capital && country.capital.length > 0 ? country.capital[0] : "",
      population: country.population.toString(),
      likes: 0,
      flagUrl: country.flags.png,
    }));

    for (const country of countries) {
      await fetch("http://localhost:3000/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(country),
      });
    }
    
    console.log("countries added in JSON Server");
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

fetchCountries();
