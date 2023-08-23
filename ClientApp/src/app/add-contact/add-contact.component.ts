import { Component, OnInit } from '@angular/core';
import { Contact, ContactToSave } from '../data/contact';
import { ContactsService } from '../contacts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { Category } from '../data/category';
import { Subcategory, SubcategoryToSave } from '../data/subcategory';
import { SubcategoriesService } from '../subcategories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  title!: string;
  contactForm!: FormGroup;
  contactId!: number;
  phoneNumberPattern: string = "[0-9]{9}";
  datePattern: string = "[0-9]{2}-[0-9]{2}-[0-9]{4}";
  categories!: Category[];
  selectedCategory!: Category;
  allSubcategories: Subcategory[] = [];
  currentCategorySubcategories!: Subcategory[];
  addNewSubcategory: boolean = false;
  newSubcategoryName!: string;

  constructor(private contactsService: ContactsService,
              private route: ActivatedRoute,
              private router: Router,
              private categoriesService: CategoriesService,
              private subcategoriesService: SubcategoriesService  ) { }

  ngOnInit(): void {
    console.log(this.categories)
    console.log("test")
    if (this.route.snapshot.params["id"]) {
      this.contactId = this.route.snapshot.params["id"];
    }

    this.getCategoriesList();
    this.getSubcategoriesList();

    this.contactForm = new FormGroup({
      id: new FormControl(0),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      category: new FormControl(''),
      subcategory: new FormControl(''),
      phoneNumber: new FormControl('', [
        Validators.pattern(this.phoneNumberPattern)
      ]),
      dateOfBirth: new FormControl('', [
        Validators.pattern(this.datePattern)
      ]),
    });
    if (this.contactId > 0) {
      this.title = "Edit";
      this.contactsService.getContact(this.contactId)
        .then((contact: Contact) => {
          this.contactForm.setValue({
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            category: contact.category,
            subcategory: contact.subcategory,
            phoneNumber: contact.phoneNumber,
            dateOfBirth: contact.dateOfBirth
          });
        }).catch((error) => {
          console.error('retriving contact error: ' + error);
        });
    } else {
      this.title = "Create";
    }
  }

  private getContactFromForm(): ContactToSave {
    return {
      id: this.contactForm.value.id,
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email,
      categoryId: this.contactForm.value.category.id,
      subcategoryId: this.contactForm.value.subcategory.id,
      phoneNumber: this.contactForm.value.phoneNumber,
      dateOfBirth: this.contactForm.value.dateOfBirth
    };
  }

  save() {
    let newContact: ContactToSave = this.getContactFromForm();
    if (this.title == "Create") {
      this.contactsService.addContact(newContact).then((response) => {
        this.router.navigate(['/contacts']);
      }).catch((error: HttpErrorResponse) => {
        console.error('adding new contact error: ' + error.error);
      });
    }
    if (this.title == "Edit") {
      this.contactsService.updateContact(newContact).then((response) => {
        this.router.navigate(['/contacts']);
      }).catch((error: HttpErrorResponse) => {
        console.error('updating contact error: ' + error.error);
      });
    }
  }


  categoryChange() {
    this.addNewSubcategory = this.contactForm.value.category.categoryName == 'Other';
    this.updateCurrentCategorySubcategories();
  }


  addSubcategory() {
    let newSubcategory: SubcategoryToSave = {
      id: 0,
      subcategoryName: this.newSubcategoryName,
      categoryId: 3,
    }
    this.subcategoriesService.addSubcategory(newSubcategory).subscribe((res: any) => {
      console.log(res);
      this.getSubcategoriesList();
      this.updateCurrentCategorySubcategories();
      this.newSubcategoryName = '';
    }, (error: string) => {
      console.error('add subcategory error ' + error);
    });
  }

  getCategoriesList() {
    this.categoriesService.getAllCategories().then((retrievedData: Category[]) => {
      this.categories = retrievedData;
    }).catch((error) => {
      console.error('fetch categories error ' + error);
    });
  }

  private updateCurrentCategorySubcategories() {
    this.currentCategorySubcategories = this
      .allSubcategories
      .filter(sc => sc.category.id == this.contactForm.value.category.id);
  }

  getSubcategoriesList() {
    this.subcategoriesService.getAllCategories().then((retrievedData: Subcategory[]) => {
      this.allSubcategories = retrievedData;
    }).catch((error) => {
      console.error('fetch categories error ' + error);
    });
  }

  get firstName() { return this.contactForm.get('firstName'); }
  get lastName() { return this.contactForm.get('lastName'); }
  get email() { return this.contactForm.get('email'); }
  get phoneNumber() { return this.contactForm.get('phoneNumber'); }
  get dateOfBirth() { return this.contactForm.get('dateOfBirth'); }
}

