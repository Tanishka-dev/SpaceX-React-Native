import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { myAxios } from "../axios.config";
import { useQuery } from "react-query";
import tw from "twrnc";
import LoadingLayout from "../components/LoadingLayout";
import { TouchableOpacity } from "react-native-gesture-handler";

const Launch = ({ route }: { route: any }) => {
   const { launchId } = route.params;
   const { data, isLoading } = useQuery(["launches", launchId], () => {
      return myAxios
         .get("launches/" + launchId)
         .then((res) => res)
         .catch((err) => console.log(err));
   });

   const [isReadMore, setisReadMore] = useState(false);
   const Press = () => setisReadMore((prev) => !prev);
   return (
      <LoadingLayout isLoading={isLoading}>
         <View
            style={tw`mx-3 my-3 flex-col shadow bg-gray-100 border border-gray-200 rounded-xl`}
         >
            <Text style={tw`text-sky-800 font-bold text-3xl text-center`}>
               {data?.data.name}
            </Text>
            <Text style={tw`text-center text-gray-500 font-bold text-sm`}>
               {new Date(data?.data?.date_local).toDateString()}
            </Text>
            <View
               style={tw`my-2 flex-col shadow bg-gray-900 border border-gray-200 rounded-xl`}
            >
               <Image
                  resizeMode="contain"
                  style={tw`h-64 w-full rounded-md my-4`}
                  source={{ uri: data?.data?.links?.patch?.large }}
               />
            </View>
            <View style={tw`bg-sky-600 bg-opacity-30  rounded-md  pb-1 px-2  `}>
               <View style={tw`flex-col`}>
                  <Text style={tw`text-white font-bold text-xl`}>
                     Description:{" "}
                  </Text>
                  <TouchableOpacity style={tw`  `} onPress={Press}>
                     {data?.data?.details ? (
                        <Text style={tw`text-white font-medium text-sm `}>
                           {isReadMore ? (
                              <Text style={tw`text-white font-medium text-sm `}>
                                 {data?.data?.details.substring(0, 450)}
                              </Text>
                           ) : (
                              <Text style={tw`text-white font-medium text-sm `}>
                                 {data?.data?.details
                                    .substring(0, 150)
                                    .concat("... ")}
                                 <Text
                                    style={tw`text-sky-600 font-medium text-sm`}
                                 >
                                    Read More
                                 </Text>
                              </Text>
                           )}
                        </Text>
                     ) : (
                        <Text style={tw`text-white font-medium text-sm `}>
                           No Description Available
                        </Text>
                     )}
                  </TouchableOpacity>
               </View>

               <View style={tw`flex-col my-2`}>
                  <Text style={tw`text-white font-bold text-xl`}>
                     Fairings reused:{" "}
                  </Text>
                  <Text style={tw`text-white font-medium text-sm `}>
                     {data?.data?.fairings?.reused ? "Yes" : "No"}
                  </Text>
               </View>

               <View style={tw`flex-col`}>
                  <Text style={tw`text-white font-bold text-xl`}>
                     Cores reused:{" "}
                  </Text>
                  <Text style={tw`text-white font-medium text-sm `}>
                     {data?.data?.cores?.reused ? "Yes" : "No"}
                  </Text>
               </View>
            </View>
         </View>
      </LoadingLayout>
   );
};

export default Launch;
