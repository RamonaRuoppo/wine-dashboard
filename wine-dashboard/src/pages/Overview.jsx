function Overview() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Overview</h1>
      <p className="text-gray-500 mt-2">Parametri Ambientali</p>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Temperatura</h3>
          <p className="text-2xl">22.5°C</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Umidità</h3>
          <p className="text-2xl">65%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Precipitazioni</h3>
          <p className="text-2xl">5.2mm</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Produzione</h3>
          <p className="text-2xl">120 q/ha</p>
        </div>
      </section>
    </div>
  );
}

export default Overview;
