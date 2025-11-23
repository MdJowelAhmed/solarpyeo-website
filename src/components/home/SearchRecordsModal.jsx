import React from "react";
import { Search, User, Calendar, X } from "lucide-react";
import { Button } from "../ui/button";

const SearchRecordsModal = ({
  searchForm,
  setSearchForm,
  searchResults,
  handleSearch,
  handlePersonSelect,
  onClose,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Search Records</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={searchForm.firstName}
            onChange={(e) =>
              setSearchForm({
                ...searchForm,
                firstName: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={searchForm.lastName}
            onChange={(e) =>
              setSearchForm({
                ...searchForm,
                lastName: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={searchForm.dateOfBirth}
            onChange={(e) =>
              setSearchForm({
                ...searchForm,
                dateOfBirth: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-3 flex items-center justify-center w-full mt-6">
          <Button
            onClick={handleSearch}
            className="px-6 lg:px-10 py-6 transition-colors"
          >
            <Search className="w-5 h-5" />
            Search Records
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Search Results</h3>
          <div className="space-y-3">
            {searchResults.map((person) => (
              <div
                key={person.id}
                onClick={() => handlePersonSelect(person)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <User className="w-8 h-8 text-gray-600" />
                  <div>
                    <div className="font-medium text-lg">{person.fullName}</div>
                    <div className="text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {person.dateOfBirth}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 &&
        searchForm.firstName &&
        searchForm.lastName && (
          <div className="text-center py-8">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Records Found
            </h3>
            <p className="text-gray-600">
              No records match your search criteria. Please verify the
              information and try again.
            </p>
          </div>
        )}
    </div>
  );
};

export default SearchRecordsModal;