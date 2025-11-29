import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// JSON data
const servicesData = [
  {
    items: [
      {
        title: "IP 65/66/67ABS PLASTIC ENCLOSURE/JUNCTION BOX/CABINET",
        description: `
          IP65/66/67 ABS enclosures are used in various environments where protection from dust, water, 
          and solid objects is needed, such as factories, warehouses, outdoor equipment, and electronic housings. 
          <br /><br />
          Shape of Enclosure - Square and Rectangular
          <br /><br /> 
          Cutout facility available for bulk qty
          <br /><br /> 
          Prototyping: These easy to use IP-65 rated cabinets give your prototype project a very Industrial look.
          <br /><br /> 
          Push Button Application, Control Panel Boxes & Communication Equipment.
          <br /><br /> 
          Outdoor Environments IP65 enclosures are used in both covered and uncovered environments.
          <br /><br /> 
          Factories and Warehouses: IP65 enclosures protect circuits in areas with chemicals, dirt, and debris.
          <br /><br /> 
          Agricultural Facilities: Protect electronics from dirt, dust, or water exposure in farms and greenhouses.
          <br /><br /> 
          Garages and Automotive Shops: Protect against auto paint, welding particles, and oil exposure.
          <br /><br /> 
          Boats and Marine Environments: IP-65 enclosures protect your circuits in moist conditions.
        `,
      },
      {
        title: "ABS PLASTIC INDUSTRIAL CARRYING CASE",
        description:
          "One-stop solution for all your equipment storage and protection needs.",
      },
    ],
  },
  {
    items: [
      {
        title: "PLASTIC TABLE TOP ENCLOSURE/BOX/CABINET",
        description:
          "Best cover protection option to design medical electrosurgical machineries e.g. cautery machine etc.",
      },
      {
        title: "PLASTIC DESK TOP ENCLOSURE/BOX/CABINET",
        description:
          "Best cover protection option to design medical equipment e.g. ultrasonic therapy unit etc.",
      },
    ],
  },
  {
    items: [
      {
        title: "DISPLAY ENCLOSURE/BOX/CABINET",
        description: "Best solution to fit your LCD's of equipment.",
      },
      {
        title: "DIN RAIL ENCLOSURE/BOX/CABINET",
        description:
          "DIN rail enclosures are used for securing and organizing electrical components in industrial and commercial settings.",
      },
    ],
  },
  {
    items: [
      {
        title:
          "DESK TOP ENCLOSURE/BOX/CABINET: TYPE – PLASTIC, MS & ALUMINUM POWDER COATED",
        description:
          "Used in many applications like networking equipment, test equipment, medical devices, and scientific appliances.",
      },
      {
        title: "HAND HELD ENCLOSURE/BOX/CABINET",
        description:
          "Suitable for measuring instruments, controllers, network devices, RFID tags, data loggers, and medical equipment.",
      },
    ],
  },
  {
    items: [
      {
        title: "Hinges Type ABS Plastic Enclosure/BOX/CABINET",
        description:
          "Used in enclosures to allow doors to swing open and closed while ensuring protection (e.g. ACDB/DCDB/METER boxes).",
      },
      {
        title: "ALUMINUM DIE CAST ENCLOSURE/BOX/CABINET",
        description:
          "Used in electronics, automotive, and telecommunications where strong protection is required.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="page services-page">
      <Header showLogin={true} />
      <main className="container main fade-in">
        <section>
          <h1 className="about-title">Services</h1>

          {/* Render JSON data */}
          {servicesData.map((group, index) => (
            <div key={index} className="about-grid">
              {group.items.map((service, idx) => (
                <div key={idx} className="about-box">
                  <h2>{service.title}</h2>
                  <p
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
