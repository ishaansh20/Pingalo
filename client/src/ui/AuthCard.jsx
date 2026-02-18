import Card from "./Card";

const AuthCard = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>
        {children}
      </Card>
    </div>
  );
};

export default AuthCard;
