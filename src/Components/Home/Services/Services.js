import React from "react";
import servicesStyles from "./services.module.css";
const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Residential Sales",
      description: "Helping clients buy and sell residential properties with ease and professionalism.",
      icon: "🏡",
    },
    {
      id: 2,
      title: "Commercial Leasing",
      description: "Expert guidance in leasing commercial spaces tailored to business needs.",
      icon: "🏢",
    },
    {
      id: 3,
      title: "Property Management",
      description: "Comprehensive property management services to ensure seamless operations.",
      icon: "🔑",
    },
    {
      id: 4,
      title: "Real Estate Investment",
      description: "Advising clients on real estate investments for maximum returns and growth.",
      icon: "💼",
    },
  ];

  const ServiceCard = ({ icon, title, description }) => {
    return (
      <div className={servicesStyles.card}>
        <div className={servicesStyles.icon}>{icon}</div>
        <h3 className={servicesStyles.title}>{title}</h3>
        <p className={servicesStyles.description}>{description}</p>
      </div>
    );
  };
  return (
    <section className={servicesStyles.section}>
      <div className={servicesStyles.container}>
        <h2 className={servicesStyles.heading}>Our Services</h2>
        <div className={servicesStyles.grid}>
          {servicesData.map((service) => (
            <ServiceCard key={service.id} icon={service.icon} title={service.title} description={service.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
