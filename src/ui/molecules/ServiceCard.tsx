interface ServiceCardProps {
    icon: React.ReactNode
    label: string
  }
  
  export const ServiceCard = ({ icon, label }: ServiceCardProps) => {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE8E8]">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
    )
  }