import Input from '../components/common/Input';

const Home = () => {
  return (
    <div className="flex justify-center p-10">
      {/* Importing from the correct path */}
      <Input 
        label="Email Address" 
        placeholder="Enter your email" 
      />
    </div>
  );
};

export default Home;