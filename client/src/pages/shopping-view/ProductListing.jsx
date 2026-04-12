import React, { useEffect, useState } from 'react';
import { ProductFilter } from '@/components/shopping-view/Filter';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { TbSortAscending } from "react-icons/tb";
import { sortOptions } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopProducts } from '@/store/product-slice';
import FetchShoppingProducts from '@/components/shopping-view/shoppingProducts';
import { useSearchParams } from 'react-router-dom';
import { addtoCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, Grid2X2, LayoutList } from 'lucide-react';

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

const ProductListing = () => {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector(state => state.shopProducts);
  const { user } = useSelector(state => state.auth);

  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let Filters = { ...filter };
    const indexOfCurrentSection = Object.keys(Filters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      Filters = {
        ...Filters,
        [getSectionId]: [getCurrentOption]
      };
    } else {
      const indexOfCurrentOption = Filters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        Filters[getSectionId].push(getCurrentOption);
      } else {
        Filters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilter(Filters);
    sessionStorage.setItem('filters', JSON.stringify(Filters));
  }

  function handleAddtoCart(productId, totalStock) {
    if (totalStock === 0) {
      toast({ title: "Out of Stock", variant: "destructive" });
      return;
    }
    dispatch(addtoCart({ userId: user?.id, productId: productId, quantity: 1 })).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: data.payload.message });
      }
    });
  }

  useEffect(() => {
    setSort('price-lowtohigh');
    const filters = sessionStorage.getItem('filters');
    setFilter(filters != undefined ? JSON.parse(filters) : {});
  }, []);

  useEffect(() => {
    if (filter && Object.entries(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter, setSearchParams]);

  useEffect(() => {
    if (filter != null && sort != null)
      dispatch(fetchShopProducts({ filterParams: filter, sortParams: sort }));
  }, [dispatch, filter, sort]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* TOP BAR / BREADCRUMB */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">
                 <span>Store</span>
                 <ChevronRight size={10} />
                 <span className="text-primary">All Products</span>
              </div>
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Boutique</h1>
           </div>

           <div className="flex items-center gap-4">
              <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                 <button className="p-2 bg-primary text-black rounded-lg shadow-lg">
                   <Grid2X2 size={18} />
                 </button>
                 <button className="p-2 text-white/40 hover:text-white transition-colors">
                   <LayoutList size={18} />
                 </button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 flex gap-2 font-bold px-6">
                    <TbSortAscending size={18} />
                    <span>SORT BY</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="bg-black/90 backdrop-blur-xl border-white/10 text-white min-w-[200px] rounded-xl p-2">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem 
                        key={sortItem.id} 
                        value={sortItem.id} 
                        className="cursor-pointer hover:bg-primary hover:text-black rounded-lg transition-colors p-3 font-bold"
                      >
                        {sortItem.label.toUpperCase()}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          
          {/* SIDEBAR FILTERS */}
          <ProductFilter filter={filter} handleFilter={handleFilter} />

          {/* PRODUCT GRID */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-4">
               <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                 Found <span className="text-primary">{productList.length}</span> Premium Artifacts
               </p>
            </div>

            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
                  ))}
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {productList && productList.length > 0 ? (
                   productList.map((productItem) => (
                     <FetchShoppingProducts 
                       key={productItem._id} 
                       product={productItem} 
                       handleAddtoCart={handleAddtoCart} 
                     />
                   ))
                 ) : (
                   <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                        <Grid2X2 size={40} />
                      </div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">No Artifacts Found</h2>
                      <p className="text-white/40 max-w-xs">Try adjusting your filters to find what you're looking for.</p>
                      <Button 
                        onClick={() => {
                          setFilter({});
                          sessionStorage.removeItem('filters');
                        }}
                        className="text-primary font-bold hover:underline"
                      >
                        CLEAR ALL FILTERS
                      </Button>
                   </div>
                 )}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
